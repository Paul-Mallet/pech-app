import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import HitArea from '../atoms/hitArea.tsx';
import ImageSlider from '../organisms/slider.tsx';
import CTAButton from '../atoms/button.tsx';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import GlobalStyles from '../../styles/base/globalStyles.tsx';
import { useTheme } from '../../components/organisms/ThemeContext.tsx';
import data from '../../data/mocks/descriptions.json';

type DescriptionSheetProps = {
	fishName: string | null;
	onClose: () => void;
};

const DescriptionSheet = React.forwardRef<BottomSheet, DescriptionSheetProps>(
	({ fishName, onClose }, ref) => {
		const [stats, setStats] = useState<any>({});
		const [loading, setLoading] = useState<boolean>(false);
		// const [error, setError] = useState<string | null>(null);
		const { theme } = useTheme();
		const styles = GlobalStyles();

		// const fetchFishData = useCallback(async () => {
		// 	try {
		// 		setLoading(true);
		// 		setError(null);
		// 		const res = await fetch(`https://lienverslapi.com/fishes/${fishName}`);
		// 		const data = await res.json();
		// 		setStats(data);
		// 	} catch (err: any) {
		// 		setError(err.message || 'Erreur de chargment');
		// 		console.error('API Error:', err);
		// 	} finally {
		// 		setLoading(false);
		// 	}
		// }, [fishName]);

		function handleData() {
			const fishStats = data.find(fish => fish.commonName.toLowerCase() === fishName?.toLowerCase());
			setStats(fishStats || {});
		}

		useEffect(() => {
			// if (fishName)
			// 	fetchFishData();
			setLoading(true);
			handleData();
			setLoading(false);
		}, [fishName/*, fetchFishData */]);

		const handleSheetChanges = useCallback((index: number) => {
			if (index === -1) {
				onClose();
			}
		}, [onClose]);

		if (loading) {
			return (
				<BottomSheet
					ref={ref}
					snapPoints={['20%']}
				>
		 			<BottomSheetView style={styles.contentContainerBottomSheet}>
		 				<ActivityIndicator size="large" color={theme.textDark} />
						<Text style={styles.h2}>Chargement...</Text>
		 			</BottomSheetView>
		 		</BottomSheet>
		 	);
		}
		if (/* error || */!stats) {
			return (
				<BottomSheet
					ref={ref}
					enablePanDownToClose
					snapPoints={['40%']}
				>
					<BottomSheetView style={styles.contentContainerBottomSheet}>
						<Text>Erreur</Text>
						<Text>{/* error || */"Données non disponibles"}</Text>
						<Button
							title="Réessayer"
							// onPress={fetchFishData}
							color={theme.textDark}
						/>
					</BottomSheetView>
				</BottomSheet>
			);
		};
		if (!stats) return null;
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
				containerStyle={{ zIndex: 999 }}
				handleComponent={() => (
					<HitArea />
				)}
			>
				<BottomSheetView focusable={true} style={styles.contentContainerBottomSheet}>
					<View style={styles.headerContainerBottomSheet}>
						<View>
							<Text style={styles.h2}>{stats?.commonName}</Text>
							<Text style={styles.hScientific}>({stats?.scientificName})</Text>
						</View>
						<View style={styles.sizeContainerBottomSheet}>
							{/* <Svg
								width="28"
								height="28"
								viewBox="0 0 256 256"
								fill={theme.textDark}
							>
								<Path d="M235.32,73.37,182.63,20.69a16,16,0,0,0-22.63,0L20.68,160a16,16,0,0,0,0,22.63l52.69,52.68a16,16,0,0,0,22.63,0L235.32,96A16,16,0,0,0,235.32,73.37ZM84.68,224,32,171.31l32-32,26.34,26.35a8,8,0,0,0,11.32-11.32L75.31,128,96,107.31l26.34,26.35a8,8,0,0,0,11.32-11.32L107.31,96,128,75.31l26.34,26.35a8,8,0,0,0,11.32-11.32L139.31,64l32-32L224,84.69Z" />
							</Svg> */}
							<FontAwesome6 name="ruler" size={28} color={theme.textDark} />
							<Text style={styles.hSize}>{stats?.minSizeCm}cm</Text>
						</View>
					</View>
					<ImageSlider />
					<Text style={styles.textDescriptionBottomSheet}>
						{stats?.englishAcronym && `${stats?.englishAcronym}, `}
						{stats?.physicalDescription?.WRF}
						{stats?.physicalDescription?.moreInfos && ` ${stats?.physicalDescription?.moreInfos}`}
					</Text>
					<CTAButton fishName={stats?.commonName} />
				</BottomSheetView>
			</BottomSheet>
		);
	}
);

export default DescriptionSheet;