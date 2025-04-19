import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Pressable, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import GlobalStyles from '../../styles/base/globalStyles.tsx';
import { useTheme } from '../organisms/ThemeContext.tsx';
import regulations from '../../data/mocks/regulations.json';

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

const LegislationSheet = React.forwardRef<BottomSheet, LegislationSheetProps>(
  ({ legislationId, legislationTitle, onClose }, ref) => {
    const [regulation, setRegulation] = useState<RegulationType | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [geojsonData, setGeojsonData] = useState<any>(null);
    const [loadingGeojson, setLoadingGeojson] = useState<boolean>(false);
    const { theme } = useTheme();
    const styles = GlobalStyles();

    // URL de démonstration pour les données GeoJSON - devrait être remplacée par l'URL réelle
    // basée sur la réglementation spécifique
    const demoGeoJsonUrl = 'https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/master/countries/FRA.geojson';
    
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

    // Fonction pour charger les données GeoJSON
    const loadGeojsonData = async () => {
      try {
        setLoadingGeojson(true);
        const response = await fetch(demoGeoJsonUrl);
        const data = await response.json();
        setGeojsonData(data);
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
        snapPoints={['70%', '95%']}
        overDragResistanceFactor={1}
        enableContentPanningGesture={false}
        enableHandlePanningGesture={true}
        onChange={handleSheetChanges}
        backgroundStyle={styles.containerBottomSheet}
        containerStyle={{
          zIndex: 999,
        }}
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
        <BottomSheetView focusable={true} style={styles.contentContainerBottomSheet}>
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
          
          <ScrollView style={{ width: '100%', marginTop: 20 }}>
            {regulation.content.map((paragraph, index) => (
              <Text key={index} style={[styles.textDescriptionBottomSheet, { marginBottom: 10 }]}>
                {paragraph}
              </Text>
            ))}
            
            {/* Section Zone Concernée avec carte */}
            <View style={{ marginTop: 20, marginBottom: 20 }}>
              <Text style={[styles.h3, { marginBottom: 10 }]}>Zone concernée</Text>
              
              <View style={{ height: 200, width: '100%', borderRadius: 8, overflow: 'hidden' }}>
                {loadingGeojson ? (
                  <View style={{ height: 200, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.backgroundLight }}>
                    <ActivityIndicator size="large" color={theme.primary} />
                    <Text style={{ marginTop: 10, color: theme.textDark }}>Chargement de la carte...</Text>
                  </View>
                ) : geojsonData ? (
                  <MapView
                    provider={PROVIDER_GOOGLE}
                    style={{ height: 200, width: '100%' }}
                    initialRegion={{
                      latitude: 46.603354, // Centre de la France
                      longitude: 1.888334,
                      latitudeDelta: 10,
                      longitudeDelta: 10,
                    }}
                  >
                    <Geojson 
                      geojson={geojsonData} 
                      strokeColor={theme.primary}
                      fillColor={`${theme.primary}50`} // 50 pour l'opacité
                      strokeWidth={2}
                    />
                  </MapView>
                ) : (
                  <View style={{ height: 200, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.backgroundLight }}>
                    <Ionicons name="map" size={48} color={theme.textLight} />
                    <Text style={{ marginTop: 10, color: theme.textDark }}>Carte non disponible</Text>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
          
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            width: '100%', 
            marginTop: 20, 
            paddingTop: 10,
            borderTopWidth: 1,
            borderTopColor: theme.inputPlaceholder 
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="document-text" size={16} color={theme.textDark} style={{ marginRight: 6 }} />
              <Text style={{ fontSize: 12, color: theme.textDark }}>Référence: {regulation.metadata.reference}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="time" size={16} color={theme.textDark} style={{ marginRight: 6 }} />
              <Text style={{ fontSize: 12, color: theme.textDark }}>Mis à jour: {regulation.metadata.lastUpdated}</Text>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

export default LegislationSheet;