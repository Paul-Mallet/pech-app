import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import HitArea from '../atoms/hitArea.tsx';
import ImageSlider from '../organisms/slider.tsx';
import CTAButton from '../atoms/button.tsx';
import { FontAwesome6 } from '@expo/vector-icons';
import GlobalStyles from '../../styles/base/globalStyles.tsx';
import { useTheme } from '../../components/organisms/ThemeContext.tsx';
import { getFishById } from '../../services/fish.service.tsx';
import { Fish } from '../../pages/fishScreen.tsx';

type DescriptionSheetProps = {
	fish: Fish;
	onClose: () => void;
};

const DescriptionSheet = React.forwardRef<BottomSheet, DescriptionSheetProps>(
	({ fish, onClose }, ref) => {
		const [stats, setStats] = useState<any>({});
		// const [loading, setLoading] = useState<boolean>(false);
		const [error, setError] = useState<string | null>(null);
		const { theme } = useTheme();
		const styles = GlobalStyles();
		const insets = useSafeAreaInsets();

		const fetchFish = () => {
			// setLoading(true);
			try {
				// console.log("\x1b[36mFetched fish:\x1b[0m", fish);
				setStats(fish);
			} catch (err) {
				setError("Impossible de charger les infos du poisson.");
			}
			//  finally {
			// 	setLoading(false);
			// }
		};

		useEffect(() => {
			fetchFish();
		  }, []);

		const handleSheetChanges = useCallback((index: number) => {
			if (index === -1) {
				onClose();
			}
		}, [onClose]);

		// if (loading) {
		// 	return (
		// 		<BottomSheet
		// 			ref={ref}
		// 			snapPoints={['20%']}
		// 		>
		//  			<BottomSheetView style={styles.contentContainerBottomSheet}>
		//  				<ActivityIndicator size="large" color={theme.textDark} />
		// 				<Text style={styles.h2}>Chargement...</Text>
		//  			</BottomSheetView>
		//  		</BottomSheet>
		//  	);
		// }
		if (error || !stats) {
			return (
				<BottomSheet
					ref={ref}
					enablePanDownToClose
					snapPoints={['40%']}
				>
					<BottomSheetView style={styles.contentContainerBottomSheet}>
						<Text>Erreur</Text>
						<Text>{error || "Données non disponibles"}</Text>
						<Button
							title="Réessayer"
							onPress={fetchFish}
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
				snapPoints={['70%', '100%']}
				topInset={insets.top + 10}
				overDragResistanceFactor={1}
				enableContentPanningGesture={false}
				enableHandlePanningGesture={true}
				onChange={handleSheetChanges}
				backgroundStyle={styles.containerBottomSheet}
				containerStyle={{ zIndex: 999 }}
				handleComponent={() => <HitArea />}
			>
				<BottomSheetView focusable={true} style={styles.contentContainerBottomSheet}>
					<View style={[styles.headerContainerBottomSheet, { marginTop: -20 }]}>
						<View>
							<Text style={styles.h2}>{fish?.name}</Text>
							<Text style={styles.hScientific}>({fish?.scientificName})</Text>
						</View>
						<View style={styles.sizeContainerBottomSheet}>
							<FontAwesome6 name="ruler" size={28} color={theme.textDark} />
							<Text style={styles.hSize}>{fish?.minSizeCm}cm</Text>
						</View>
					</View>
					<ImageSlider />
					<Text style={styles.textDescriptionBottomSheet}>
						{fish?.englishAcronym ? `${fish.englishAcronym}, ` : ''}
						{fish?.physicalDescription?.WRF ?? ''}
						{fish?.physicalDescription?.moreInfos ? ` ${fish.physicalDescription.moreInfos}` : ''}
					</Text>
					<CTAButton searchText={fish?.name} />
				</BottomSheetView>
			</BottomSheet>
		);
	}
);

export default DescriptionSheet;