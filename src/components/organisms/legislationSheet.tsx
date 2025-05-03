import React, { useCallback, useEffect, useState } from 'react';
import { View, Linking, Text, Button, ScrollView, ActivityIndicator, BackHandler, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MapView, { PROVIDER_GOOGLE, Geojson } from 'react-native-maps';
import BottomSheet, { BottomSheetView, BottomSheetBackdropProps, BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import HitArea from '../atoms/hitArea.tsx';
import { useTheme } from '../organisms/ThemeContext.tsx';
import GlobalStyles from '../../styles/base/globalStyles.tsx';
import { getLegislationById } from '../../services/fish.service.tsx';
import { Legislation, LegislationSheetProps } from '../../models/legislation.model.tsx';
import { RegionCoordinates } from '../../models/geojson.model.tsx';

const LegislationSheet = React.forwardRef<BottomSheetModal, LegislationSheetProps>(
	({ legislationId, onClose }, ref) => {
	const bottomSheetRef = ref as React.RefObject<BottomSheetModal>;
	const [stats, setStats] = useState<Legislation | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [geojson, setGeojson] = useState<any>(null);
	const [loadingGeojson, setLoadingGeojson] = useState<boolean>(false);
	const [regionCoor, setRegionCoor] = useState<RegionCoordinates | null>(null);
	const { theme } = useTheme();
	const styles = GlobalStyles();
	const insets = useSafeAreaInsets();

	const fetchLegislation = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const legislation = await getLegislationById(legislationId);
			setStats(legislation);
		} catch (err) {
			setError("Impossible de charger les infos de la legislation.");
			setStats(null);
		} finally {
			setLoading(false);
		}
	}, [legislationId]);

	const calculateRegionFromGeoJson = useCallback((geoJson: any): RegionCoordinates => {
		let minLat = 90, maxLat = -90, minLng = 180, maxLng = -180;
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
		const latDelta = (maxLat - minLat) * 1.5;
		const lngDelta = (maxLng - minLng) * 1.5;
		return {
			latitude: centerLat,
			longitude: centerLng,
			latitudeDelta: latDelta,
			longitudeDelta: lngDelta
		};
	}, []);

	useEffect(() => {
		fetchLegislation();
	}, [fetchLegislation]);

	useEffect(() => {
		if (stats && stats.places[0].geojson) {
			setLoadingGeojson(true);
			const geoJson = stats.places[0].geojson;
			setGeojson(geoJson);
			const regionCoor = calculateRegionFromGeoJson(geoJson);
			setRegionCoor(regionCoor);
			setLoadingGeojson(false);
		}
	}, [stats, calculateRegionFromGeoJson]);

	useEffect(() => {
		const onBackPress = () => {
			if (bottomSheetRef && bottomSheetRef.current) {
				bottomSheetRef.current.close();
				return true;
			}
			return false;
		};
		BackHandler.addEventListener('hardwareBackPress', onBackPress);
		return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
	}, [bottomSheetRef]);

	const handleSheetChanges = useCallback((index: number) => {
		if (index === -1) onClose();
	}, [onClose]);

	const snapPoints = loading ? ['20%'] : error || !stats ? ['40%'] : ['90%'];

	return (
		<BottomSheet
			ref={ref}
			enablePanDownToClose
			snapPoints={snapPoints}
			topInset={insets.top + 10}
			overDragResistanceFactor={2}
			enableContentPanningGesture={false}
			enableHandlePanningGesture={true}
			handleHeight={40}
			onChange={handleSheetChanges}
			backgroundStyle={[styles.containerBottomSheet, { height: '100%' }]}
			containerStyle={{ zIndex: 999 }}
			android_keyboardInputMode="adjustPan"
			handleComponent={() => <HitArea />}
			backdropComponent={(props: BottomSheetBackdropProps) => (
				<BottomSheetBackdrop
					{...props}
					appearsOnIndex={0}
					disappearsOnIndex={-1}
					style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 999 }}
				/>
			)}
		>
			<BottomSheetView style={styles.contentContainerBottomSheet}>
				{loading ? (
					<>
						<ActivityIndicator size="large" color={theme.textDark} />
						<Text style={styles.h2}>Chargement...</Text>
					</>
				) : error || !stats ? (
					<>
						<Text style={styles.h2}>Erreur</Text>
						<Text>{error || "Données non disponibles"}</Text>
						<Button title="Réessayer" onPress={fetchLegislation} color={theme.textDark} />
					</>
				) : (
					<ScrollView 
						style={{ marginTop: -20 }}
						contentContainerStyle={{ paddingBottom: 60 }}
						bounces={false}
						showsVerticalScrollIndicator
						keyboardShouldPersistTaps="handled"
					>
						<View style={styles.headerContainerBottomSheet}>
							<View>
								<Text style={[styles.h2, { fontSize: 16, lineHeight: 24 }]}>{stats.title}</Text>
								<View style={{ flexDirection: 'row', alignItems: 'center' }}>
									<Ionicons name="calendar" size={16} color={theme.textDark} style={{ marginRight: 8, marginTop: -4 }} />
									<Text style={[styles.hScientific, { marginTop: 0 }]}>{stats.date}</Text>
								</View>
							</View>
						</View>
						<Text style={[styles.textDescriptionBottomSheet, { marginBottom: -4 }]}>{stats.article}</Text>
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
								) : (
									<View style={{ height: 200, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.body }}>
										<Ionicons name="map" size={48} color={theme.textDark} />
										<Text style={{ marginTop: 10, color: theme.textDark }}>Carte non disponible</Text>
									</View>
								)}
							</View>
						</View>
					</ScrollView>
				)}
			</BottomSheetView>
		</BottomSheet>
	);
});

export default LegislationSheet;
