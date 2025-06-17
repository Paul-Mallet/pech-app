import React, { useCallback } from 'react';
import { View, Text, BackHandler } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetView } from '@gorhom/bottom-sheet';
import HitArea from '../atoms/hitArea.tsx';
import ImageSlider from '../organisms/slider.tsx';
import CTAButton from '../atoms/button.tsx';
import { FontAwesome6 } from '@expo/vector-icons';
import GlobalStyles from '../../styles/base/globalStyles.tsx';
import { useTheme } from '../../components/organisms/ThemeContext.tsx';
import { DescriptionSheetProps } from '../../models/fish.model.tsx';
import { useFocusEffect } from '@react-navigation/native';

const DescriptionSheet = React.forwardRef<BottomSheet, DescriptionSheetProps>(
	({ fish, onClose }, ref) => {
		if (!fish) return null;
		const { theme, font } = useTheme();
		const styles = GlobalStyles();

		useFocusEffect(
			useCallback(() => {
			  const onBackPress = () => {
				if (ref && 'current' in ref && ref.current) {
				  ref.current.close();
				  return true;
				}
				return false;
			  };
		  
			  BackHandler.addEventListener('hardwareBackPress', onBackPress);
			  return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
			}, [ref])
		);

		const handleSheetChanges = useCallback((index: number) => {
			if (index === -1) {
				onClose();
			}
		}, [onClose]);

		return (
			<View style={styles.viewContainerBottomSheet}>
				<BottomSheet
					ref={ref}
					enablePanDownToClose
					snapPoints={['90%']}
					overDragResistanceFactor={2}
					enableContentPanningGesture={true}
					enableHandlePanningGesture={true}
					onChange={handleSheetChanges}
					android_keyboardInputMode="adjustPan"
					backgroundStyle={styles.containerBottomSheet}
					handleComponent={() => <HitArea />}
					enableOverDrag={false}
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
						<ScrollView
							contentContainerStyle={{ rowGap: 20, paddingHorizontal: 20 }}
							showsVerticalScrollIndicator={true}
							keyboardShouldPersistTaps="handled"
							bounces={false}
						>
							<View style={[styles.headerContainerBottomSheet, {marginBottom: -30}]}>
								<Text style={[styles.h2, {fontSize: 20}]}>{fish?.name}</Text>
								<View style={styles.sizeContainerBottomSheet}>
									<FontAwesome6 name="ruler" size={28} color={theme.textDark} />
									<Text style={styles.hSize}>{fish?.minSizeCm}cm</Text>
								</View>
							</View>
							<Text style={[styles.hScientific, {width: '100%'}]}>({fish?.faoCode? fish.faoCode + ' - ' : '' }{fish?.scientificName})</Text>
							<ImageSlider images={fish.additionalImages?.map(img => img.url) || []} />
							<Text style={[styles.textDescriptionBottomSheet, { fontSize: 14 }]}>
								{fish?.physicalDescription ? fish.physicalDescription : ''}
							</Text>
							{fish?.particularity &&
								<View>
									<Text style={[styles.textDescriptionBottomSheet, { fontSize: 14, fontFamily: font.bold }]}>
										{'Particularités : '}
									</Text>
									<Text style={[styles.textDescriptionBottomSheet, { fontSize: 14 }]}>
										{fish.particularity}
									</Text>
								</View>
							}
							<View style={{paddingBottom: 140}}>
								<CTAButton searchText={fish?.name} />
							</View>
						</ScrollView>
					</BottomSheetView>
				</BottomSheet>
			</View>
		);
	}
);

export default DescriptionSheet;