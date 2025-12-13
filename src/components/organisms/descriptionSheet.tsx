import React from 'react';
import { Modal, View, Text, ScrollView, BackHandler, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import CTAButton from '../atoms/button.tsx';
import ImageSlider from '../organisms/slider.tsx';
import { useTheme } from '../../components/organisms/ThemeContext.tsx';
import GlobalStyles from '../../styles/base/globalStyles.tsx';
import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import { DescriptionSheetProps } from '../../models/fish.model.tsx';

const DescriptionSheet = React.forwardRef<null, DescriptionSheetProps>(
	({ fish, onClose, visible }, _) => {
  const { theme, font } = useTheme();
  const styles = GlobalStyles();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (visible) {
          onClose();
          return true;
        }
        return false;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [visible, onClose])
  );

  if (!fish) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
		<TouchableWithoutFeedback onPress={onClose}>
			<View style={styles.modalBackdrop} />
		</TouchableWithoutFeedback>
		<View style={styles.viewContainerBottomSheet}>

			<View style={styles.containerBottomSheet}>
				<TouchableOpacity onPress={onClose} style={styles.closeIcon} hitSlop={{ top: 10, bottom: 10, left: 150, right: 150 }}>
					<Ionicons name="chevron-down" size={32} color={theme.textDark} />
				</TouchableOpacity>
				<ScrollView
				contentContainerStyle={{ rowGap: 20, paddingHorizontal: 20 }}
				keyboardShouldPersistTaps="handled"
				showsVerticalScrollIndicator
				>
					<View style={[styles.headerContainerBottomSheet, { marginBottom: -30 }]}>
						<Text style={[styles.h2, { fontSize: 20 }]}>{fish?.name}</Text>
						<View style={styles.sizeContainerBottomSheet}>
						<FontAwesome6 name="ruler" size={28} color={theme.textDark} />
						<Text style={styles.hSize}>{fish?.minSizeCm}cm</Text>
						</View>
					</View>
					<Text style={[styles.hScientific, { width: '100%' }]}>({fish?.faoCode ? `${fish.faoCode} - ` : ''}{fish?.scientificName})</Text>
					<ImageSlider images={fish.additionalImages?.map(img => img.url) || []} />
					<Text style={[styles.textDescriptionBottomSheet, { fontSize: 14 }]}>{fish?.physicalDescription || ''}</Text>
					{fish?.particularity && (
						<View>
							<Text style={[styles.textDescriptionBottomSheet, { fontSize: 14, fontFamily: font.bold, lineHeight: 30 }]}>Particularités :</Text>
							<Text style={[styles.textDescriptionBottomSheet, { fontSize: 14 }]}>{fish.particularity}</Text>
						</View>
					)}
					<View style={{ paddingBottom: 40 }}>
						<CTAButton searchText={fish?.name} />
					</View>
				</ScrollView>
			</View>
		</View>
    </Modal>
  );
});

export default DescriptionSheet;
