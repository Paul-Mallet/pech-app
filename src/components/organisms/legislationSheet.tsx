import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, BackHandler } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MapView, { PROVIDER_GOOGLE, Geojson } from 'react-native-maps';
import BottomSheet, { BottomSheetView, BottomSheetMethods } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import HitArea from '../atoms/hitArea.tsx';
import { useTheme } from '../organisms/ThemeContext.tsx';
import GlobalStyles from '../../styles/base/globalStyles.tsx';

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
  geojson: string;
};

type LegislationSheetProps = {
  legislationId?: number;
  legislationTitle?: string;
  onClose: () => void;
};

const LegislationSheet = React.forwardRef<BottomSheetMethods, LegislationSheetProps>(
  ({ legislationId, legislationTitle, onClose }, ref) => {
    const bottomSheetRef = ref as React.RefObject<BottomSheetMethods>;
    const [regulation, setRegulation] = useState<RegulationType | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [geojsonData, setGeojsonData] = useState<any>(null);
    const [loadingGeojson, setLoadingGeojson] = useState<boolean>(false);
    const [mapRegion, setMapRegion] = useState(null);
    const { theme, font } = useTheme();
    const styles = GlobalStyles();
    const insets = useSafeAreaInsets();
    
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

    const calculateRegionFromGeoJson = (geoJson: any) => {
      let minLat = 90;
      let maxLat = -90;
      let minLng = 180;
      let maxLng = -180;

      const processCoordinates = (coords: any[]) => {
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

      geoJson.features.forEach((feature: any) => {
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
      if (!regulation || !regulation.geojson) {
        console.error("Aucune URL GeoJSON disponible dans la regulation.");
        return;
      }
      try {
        setLoadingGeojson(true);
        const response = await fetch(regulation.geojson);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
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

    // Interception du bouton retour Android pour fermer la BottomSheet avec animation
    useEffect(() => {
      const onBackPress = () => {
        if (bottomSheetRef && bottomSheetRef.current) {
          bottomSheetRef.current.close(); // Animation de fermeture
          return true;
        }
        return false;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [bottomSheetRef]);

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
        snapPoints={['100%']}
        topInset={insets.top + 10}
        overDragResistanceFactor={2}
        enableContentPanningGesture={false}
        enableHandlePanningGesture={true}
        handleHeight={40}
        onChange={handleSheetChanges}
        backgroundStyle={[styles.containerBottomSheet, { height: '100%' }]}
        containerStyle={{
          zIndex: 999,
        }}
        android_keyboardInputMode="adjustPan"
        handleComponent={() => (
          <HitArea />
        )}
      >
        <BottomSheetView focusable={true} style={styles.contentContainerBottomSheetLegislation}>
          
          <ScrollView 
            style={{
              marginTop: -20
            }}
            contentContainerStyle={{
              paddingBottom: 60
            }}
            bounces={false}
            showsVerticalScrollIndicator={true}
            keyboardShouldPersistTaps="handled"
          >
          <View style={styles.headerContainerBottomSheet}>
            <View>
              <Text style={[styles.h2, {fontSize: 20, lineHeight: 30}]}>{regulation.title}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="calendar" size={16} color={theme.textDark} style={{ marginRight: 8, marginTop: -4, }} />
                  <Text style={[styles.hScientific, { marginTop: 0 }]}>{regulation.date}</Text>
                </View>
            </View>
          </View>
            {regulation.content.map((paragraph, index) => (
              <Text key={index} style={[styles.textDescriptionBottomSheet, { marginBottom: 10 }]}>
                {paragraph}
              </Text>
            ))}
            
            <View style={{ marginTop: 20, marginBottom: 20 }}>
              <Text style={[styles.h2, { fontSize: 20, marginBottom: 10 }]}>Zone concernée</Text>
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
                    <Text style={{ marginTop: 10, color: theme.textDark, fontFamily: font.regular }}>Carte non disponible</Text>
                  </View>
                )}
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="document-text" size={16} color={theme.textDark} style={{ marginRight: 6 }} />
              <Text style={{ fontSize: 14, color: theme.textDark, fontFamily: font.regular }}>Référence: {regulation.metadata.reference}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="time" size={16} color={theme.textDark} style={{ marginRight: 6 }} />
              <Text style={{ fontSize: 14, color: theme.textDark, fontFamily: font.regular }}>Mis à jour: {regulation.metadata.lastUpdated}</Text>
            </View>
          </ScrollView>
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

export default LegislationSheet;