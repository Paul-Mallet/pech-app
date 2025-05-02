import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetView } from '@gorhom/bottom-sheet';
import HitArea from '../atoms/hitArea.tsx';
import ImageSlider from '../organisms/slider.tsx';
import CTAButton from '../atoms/button.tsx';
import { FontAwesome6 } from '@expo/vector-icons';
import GlobalStyles from '../../styles/base/globalStyles.tsx';
import { useTheme } from '../../components/organisms/ThemeContext.tsx';
import { DescriptionSheetProps } from '../../models/fish.model.tsx';

const DescriptionSheet = React.forwardRef<BottomSheet, DescriptionSheetProps>(
	({ fish, onClose }, ref) => {
		const [stats, setStats] = useState<any>({});
		const [error, setError] = useState<string | null>(null);
		const { theme } = useTheme();
		const styles = GlobalStyles();
		const insets = useSafeAreaInsets();

		const fetchFish = () => {
			try {
				setStats(fish);
			} catch (err) {
				setError("Impossible de charger les infos du poisson.");
			}
		};

		useEffect(() => {
			fetchFish();
		  }, []);

		const handleSheetChanges = useCallback((index: number) => {
			if (index === -1) {
				onClose();
			}
		}, [onClose]);

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
					  )}
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
				handleComponent={() => <HitArea />}
				containerStyle={{ zIndex: 999 }}
				backdropComponent={(props: BottomSheetBackdropProps) => (
					<BottomSheetBackdrop
					  {...props}
					  appearsOnIndex={0}
					  disappearsOnIndex={-1}
					  style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 999 }}
					/>
				  )}
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
					<ImageSlider images={fish.additionalImages.map(image => image.url)} />
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