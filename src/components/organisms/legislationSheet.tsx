import React, { useCallback, useEffect, useState } from 'react';
import { View, Linking, Text, Button, ScrollView, ActivityIndicator, BackHandler, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MapView, { PROVIDER_GOOGLE, Geojson } from 'react-native-maps';
import BottomSheet, { BottomSheetView, BottomSheetMethods, BottomSheetBackdropProps, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import HitArea from '../atoms/hitArea.tsx';
import { useTheme } from '../organisms/ThemeContext.tsx';
import GlobalStyles from '../../styles/base/globalStyles.tsx';
import { getLegislationById } from '../../services/fish.service.tsx';
import { FeatureCollection, Geometry } from 'geojson';
import { Legislation } from '../../pages/legislationScreen.tsx';

// Import avec 'with' au lieu de 'assert'
// import regulationsData from '../../data/mocks/regulations.json' with { type: 'json' };
// const regulations = regulationsData;

// type LegislationType = {
// 	id: number;
// 	date: string;
// 	title: string;
// 	content: string[];
// 	metadata: {
// 		reference: string;
// 		lastUpdated: string;
// 	};
// 	geojson: string;
// };

type LegislationSheetProps = {
	legislationId: string | null;
	onClose: () => void;
};

type RegionCoordinates = {
	latitude: number;
	longitude: number;
	latitudeDelta: number;
	longitudeDelta: number;
};

const LegislationSheet = React.forwardRef<BottomSheetMethods, LegislationSheetProps>(
	({ legislationId, onClose }, ref) => {
	const bottomSheetRef = ref as React.RefObject<BottomSheetMethods>;
	const [stats, setStats] = useState<Legislation | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [geojson, setGeojson] = useState<any>(null);
	const [loadingGeojson, setLoadingGeojson] = useState<boolean>(false);
	const [regionCoor, setRegionCoor] = useState<RegionCoordinates | null>(null);
	const { theme } = useTheme();
	const styles = GlobalStyles();
	const insets = useSafeAreaInsets();

	const fetchLegislation = async () => {
		setLoading(true);
		try {
			const legislation = await getLegislationById(legislationId);
			setStats(legislation);
		} catch (err) {
			setError("Impossible de charger les infos de la legislation.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchLegislation();
	}, []);

	useEffect(() => {
		if (stats)
		{
			const loadGeojson = async () => {
				setLoadingGeojson(true);
				try {
					const res = await fetch(`https://raw.githubusercontent.com/gregoiredavid/france-geojson/refs/heads/master/regions/corse/cantons-corse.geojson`); //maps api + ${stats.places[0].name}
					if (!res.ok)
						throw new Error(`HTTP error! status: ${res.status}`);
					const data = await res.json();
					setGeojson(data);
					const regionCoor = calculateRegionFromGeoJson(data);
					setRegionCoor(regionCoor);
				} catch (err) {
					console.error("Erreur lors du chargement des données GeoJSON:", err);
				} finally {
					setLoadingGeojson(false);
				}
			};
			loadGeojson();
		}
	}, [stats]);

	useEffect(() => {
		const onBackPress = () => {
			if (bottomSheetRef && bottomSheetRef.current) {
				bottomSheetRef.current.close();
				return (true);
			}
			return (false);
		};
		BackHandler.addEventListener('hardwareBackPress', onBackPress);
		return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
	}, [bottomSheetRef]);

	const calculateRegionFromGeoJson = (geoJson: FeatureCollection<Geometry>): RegionCoordinates => {
		let minLat = 90;
		let maxLat = -90;
		let minLng = 180;
		let maxLng = -180;
		const processCoordinates = (coords: any[]) => {
			coords.forEach(coord => {
				if (Array.isArray(coord[0]))
					processCoordinates(coord);
				else {
					const [lng, lat] = coord;
					minLat = Math.min(minLat, lat);
					maxLat = Math.max(maxLat, lat);
					minLng = Math.min(minLng, lng);
					maxLng = Math.max(maxLng, lng);
				}
			});
		};
		geoJson.features.forEach((feature: any) => {
			if (feature.geometry.coordinates)
				processCoordinates(feature.geometry.coordinates);
		});
		const centerLat = (minLat + maxLat) / 2;
		const centerLng = (minLng + maxLng) / 2;
		const latDelta = (maxLat - minLat) * 1.5;
		const lngDelta = (maxLng - minLng) * 1.5;
		return {
			latitude: centerLat,
			longitude: centerLng,
			latitudeDelta: latDelta,
			longitudeDelta: lngDelta
		};
	};

	const handleSheetChanges = useCallback((index: number) => {
	  if (index === -1)
		onClose();
	}, [onClose]);

	if (loading) {
		return (
			<BottomSheet 
			ref={ref} 
			snapPoints={['20%']}
			backdropComponent={(props: BottomSheetBackdropProps) => (
				<BottomSheetBackdrop
				  {...props}
				  appearsOnIndex={0}
				  disappearsOnIndex={-1}
				  style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
				/>
			  )}
			>
				<BottomSheetView style={styles.contentContainerBottomSheet}>
					<ActivityIndicator size="large" color={theme.textDark} />
					<Text style={styles.h2}>Chargement...</Text>
				</BottomSheetView>
			</BottomSheet>
		);
	}
	if (error || !stats) {
		return (
			<BottomSheet
			ref={ref} 
			enablePanDownToClose 
			snapPoints={['40%']}
			backdropComponent={(props: BottomSheetBackdropProps) => (
				<BottomSheetBackdrop
				  {...props}
				  appearsOnIndex={0}
				  disappearsOnIndex={-1}
				  style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
				/>
			  )}>
				<BottomSheetView style={styles.contentContainerBottomSheet}>
					<Text>Erreur</Text>
					<Text>{error || "Données non disponibles"}</Text>
					<Button
						title="Réessayer"
						onPress={fetchLegislation}
						color={theme.textDark}
					/>
				</BottomSheetView>
			</BottomSheet>
		);
	};
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
			containerStyle={{ zIndex: 999 }}
			android_keyboardInputMode="adjustPan"
			handleComponent={() => <HitArea /> }
			backdropComponent={(props: BottomSheetBackdropProps) => (
				<BottomSheetBackdrop
				  {...props}
				  appearsOnIndex={0}
				  disappearsOnIndex={-1}
				  style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
				/>
			  )}
		>
			<BottomSheetView focusable={true} style={styles.contentContainerBottomSheetLegislation}>
				<ScrollView 
					style={{ marginTop: -20 }}
					contentContainerStyle={{ paddingBottom: 60 }}
					bounces={false}
					showsVerticalScrollIndicator={true}
					keyboardShouldPersistTaps="handled"
				>
				<View style={styles.headerContainerBottomSheet}>
					<View>
						<Text style={[styles.h2, {fontSize: 20, lineHeight: 30}]}>{stats.title}</Text>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Ionicons name="calendar" size={16} color={theme.textDark} style={{ marginRight: 8, marginTop: -4, }} />
							<Text style={[styles.hScientific, { marginTop: 0 }]}>{stats.date}</Text>
						</View>
					</View>
				</View>
					<Text style={[styles.textDescriptionBottomSheet, { marginBottom: -4 }]}>
						{stats.article}
					</Text>
					<TouchableOpacity onPress={() => Linking.openURL(`${stats.link}`)}>
						<Text style={[styles.textDescriptionBottomSheet, { marginBottom: 10, textDecorationLine: 'underline' }]}>
							Réglementation complète
						</Text>
					</TouchableOpacity>
					<View style={{ marginTop: 20, marginBottom: 20 }}>
						<Text style={[styles.h2, { fontSize: 20, marginBottom: 10 }]}>Zone concernée</Text>
						<View style={{ height: 200, width: '100%', borderRadius: 8, overflow: 'hidden' }}>
							{loadingGeojson ? (
							<View style={{ height: 200, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.body }}>
								<ActivityIndicator size="large" color={theme.textHighlightDark} />
								<Text style={{ marginTop: 10, color: theme.textDark }}>Chargement de la carte...</Text>
							</View>
							) : geojson ? (
							<View>
								<MapView
									provider={PROVIDER_GOOGLE}
									style={{ height: 200, width: '100%' }}
									initialRegion={regionCoor || {
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
									geojson={geojson} 
									strokeColor={theme.textHighlightDark}
									fillColor={`${theme.textHighlightDark}50`}
									strokeWidth={2}
									/>
								</MapView>
								{/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
									<Ionicons name="document-text" size={16} color={theme.textDark} style={{ marginRight: 6 }} />
									<Text style={{ fontSize: 14, color: theme.textDark }}>
										Référence: {`${stats.places[0].geojson?.features[0].properties.nom}, ${stats.places[0].geojson?.features[0].properties.codeDepartement}`}
									</Text>
								</View>
								<View style={{ marginBottom: 60, flexDirection: 'row', alignItems: 'center' }}>
									<Ionicons name="time" size={16} color={theme.textDark} style={{ marginRight: 6 }} />
									<Text style={{ fontSize: 14, color: theme.textDark }}>
										Mis à jour: {stats.date}
									</Text>
								</View> */}
							</View>
							) : (
							<View style={{ height: 200, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.body }}>
								<Ionicons name="map" size={48} color={theme.textDark} />
								<Text style={{ marginTop: 10, color: theme.textDark }}>Carte non disponible</Text>
							</View>
							)}
						</View>
					</View>
				</ScrollView>
			</BottomSheetView>
		</BottomSheet>
	);
  }
);

export default LegislationSheet;