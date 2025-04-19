import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Pressable, ScrollView, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import BottomSheet, { BottomSheetView, BottomSheetMethods } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import MapView, { PROVIDER_GOOGLE, Geojson } from 'react-native-maps';
import GlobalStyles from '../../styles/base/globalStyles.tsx';
import { useTheme } from '../organisms/ThemeContext.tsx';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Import avec 'with' au lieu de 'assert'
import regulationsData from '../../data/mocks/regulations.json' with { type: 'json' };
const regulations = regulationsData;

type RegulationType = {
  id: number;
  date: string;
  title: string;
  content: string[];
  metadata: {
    reference: string;
    lastUpdated: string;
  };
};

type LegislationSheetProps = {
  legislationId?: number;
  legislationTitle?: string;
  onClose: () => void;
};

const LegislationSheet = React.forwardRef<BottomSheetMethods, LegislationSheetProps>(
  ({ legislationId, legislationTitle, onClose }, ref) => {
    const [regulation, setRegulation] = useState<RegulationType | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [geojsonData, setGeojsonData] = useState<any>(null);
    const [loadingGeojson, setLoadingGeojson] = useState<boolean>(false);
    const [mapRegion, setMapRegion] = useState(null);
    const { theme } = useTheme();
    const styles = GlobalStyles();
    const insets = useSafeAreaInsets();

    const demoGeoJsonUrl = 'https://raw.githubusercontent.com/gregoiredavid/france-geojson/refs/heads/master/regions/corse/cantons-corse.geojson';
    
    function handleData() {
      let legislationData: RegulationType | undefined;

      if (legislationId) {
        legislationData = regulations.find(reg => reg.id === legislationId) as RegulationType;
      } else if (legislationTitle) {
        legislationData = regulations.find(reg => 
          reg.title.toLowerCase().includes(legislationTitle.toLowerCase())
        ) as RegulationType;
      }

      setRegulation(legislationData || null);
    }

    const calculateRegionFromGeoJson = (geoJson) => {
      let minLat = 90;
      let maxLat = -90;
      let minLng = 180;
      let maxLng = -180;

      const processCoordinates = (coords) => {
        coords.forEach(coord => {
          if (Array.isArray(coord[0])) {
            processCoordinates(coord);
          } else {
            const [lng, lat] = coord;
            minLat = Math.min(minLat, lat);
            maxLat = Math.max(maxLat, lat);
            minLng = Math.min(minLng, lng);
            maxLng = Math.max(maxLng, lng);
          }
        });
      };

      geoJson.features.forEach(feature => {
        if (feature.geometry.coordinates) {
          processCoordinates(feature.geometry.coordinates);
        }
      });

      const centerLat = (minLat + maxLat) / 2;
      const centerLng = (minLng + maxLng) / 2;
      const latDelta = (maxLat - minLat) * 1.5; // 1.5 pour ajouter une marge
      const lngDelta = (maxLng - minLng) * 1.5;

      return {
        latitude: centerLat,
        longitude: centerLng,
        latitudeDelta: latDelta,
        longitudeDelta: lngDelta
      };
    };

    const loadGeojsonData = async () => {
      try {
        setLoadingGeojson(true);
        const response = await fetch(demoGeoJsonUrl);
        const data = await response.json();
        setGeojsonData(data);
        const region = calculateRegionFromGeoJson(data);
        setMapRegion(region);
        setLoadingGeojson(false);
      } catch (error) {
        console.error("Erreur lors du chargement des données GeoJSON:", error);
        setLoadingGeojson(false);
      }
    };

    useEffect(() => {
      setLoading(true);
      handleData();
      setLoading(false);
    }, [legislationId, legislationTitle]);

    useEffect(() => {
      if (regulation) {
        loadGeojsonData();
      }
    }, [regulation]);

    const handleSheetChanges = useCallback((index: number) => {
      if (index === -1) {
        onClose();
      }
    }, [onClose]);

    if (!regulation) return null;

    return (
      <BottomSheet
        ref={ref}
        enablePanDownToClose
        snapPoints={['70%', '85%']}
        topInset={insets.top + 10}
        overDragResistanceFactor={2}
        enableContentPanningGesture={false}
        enableHandlePanningGesture={true}
        onChange={handleSheetChanges}
        backgroundStyle={[styles.containerBottomSheet, { height: '100%' }]}
        containerStyle={{
          zIndex: 999,
          height: '100%',
        }}
        android_keyboardInputMode="adjustPan"
        handleComponent={() => (
          <Pressable 
            style={{ 
              paddingVertical: 20,
              paddingHorizontal: '30%',
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                width: 40,
                height: 5,
                borderRadius: 4,
                backgroundColor: '#1a1a1a',
                opacity: 0.7,
                alignSelf: 'center',
              }}
            />
          </Pressable>
        )}
      >
        <BottomSheetView focusable={true} style={[styles.contentContainerBottomSheet, { 
          flex: 1,
          maxHeight: '100%',
          overflow: 'hidden'
        }]}>
          <View style={styles.headerContainerBottomSheet}>
            <View style={{ flex: 1 }}>
              <Text style={styles.h2}>{regulation.title}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                <Ionicons name="calendar" size={16} color={theme.textDark} style={{ marginRight: 6 }} />
                <Text style={styles.hScientific}>{regulation.date}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="book" size={24} color={theme.textHighlightDark} />
            </View>
          </View>
          
          <ScrollView 
            style={{ 
              flex: 1,
              width: '100%',
              height: '85%'  // Hauteur fixe pour laisser de l'espace pour le footer
            }}
            contentContainerStyle={{ 
              paddingBottom: 80  // Ajoute un padding en bas pour éviter que le contenu ne soit caché par le footer
            }}
            bounces={false}
            showsVerticalScrollIndicator={true}
          >
            {regulation.content.map((paragraph, index) => (
              <Text key={index} style={[styles.textDescriptionBottomSheet, { marginBottom: 10 }]}>
                {paragraph}
              </Text>
            ))}
            
            <View style={{ marginTop: 20, marginBottom: 20 }}>
              <Text style={[styles.h2, { marginBottom: 10 }]}>Zone concernée</Text>
              
              <View style={{ height: 200, width: '100%', borderRadius: 8, overflow: 'hidden' }}>
                {loadingGeojson ? (
                  <View style={{ height: 200, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.body }}>
                    <ActivityIndicator size="large" color={theme.textHighlightDark} />
                    <Text style={{ marginTop: 10, color: theme.textDark }}>Chargement de la carte...</Text>
                  </View>
                ) : geojsonData ? (
                  <MapView
                    provider={PROVIDER_GOOGLE}
                    style={{ height: 200, width: '100%' }}
                    initialRegion={mapRegion || {
                      latitude: 46.603354,
                      longitude: 1.888334,
                      latitudeDelta: 10,
                      longitudeDelta: 10,
                    }}
                    scrollEnabled={false}
                    zoomEnabled={false}
                    rotateEnabled={false}
                    pitchEnabled={false}
                  >
                    <Geojson 
                      geojson={geojsonData} 
                      strokeColor={theme.textHighlightDark}
                      fillColor={`${theme.textHighlightDark}50`}
                      strokeWidth={2}
                    />
                  </MapView>
                ) : (
                  <View style={{ height: 200, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.body }}>
                    <Ionicons name="map" size={48} color={theme.textDark} />
                    <Text style={{ marginTop: 10, color: theme.textDark }}>Carte non disponible</Text>
                  </View>
                )}
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="document-text" size={16} color={theme.textDark} style={{ marginRight: 6 }} />
              <Text style={{ fontSize: 14, color: theme.textDark }}>Référence: {regulation.metadata.reference}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="time" size={16} color={theme.textDark} style={{ marginRight: 6 }} />
              <Text style={{ fontSize: 14, color: theme.textDark }}>Mis à jour: {regulation.metadata.lastUpdated}</Text>
            </View>
          </ScrollView>
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

export default LegislationSheet;