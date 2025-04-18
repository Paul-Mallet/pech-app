import React, { useState, useRef } from 'react';
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  Pressable,
  GestureResponderEvent
} from 'react-native';
import { BottomSheetFlatList, BottomSheetView } from '@gorhom/bottom-sheet';
import type { BottomSheetFlatListMethods } from '@gorhom/bottom-sheet';
import { lightTheme } from '../../styles/base/Themes.tsx';

type ImageKey = 'bar_01.png' | 'bar_02.png' | 'bar_03.png' | 'bar_04.png';

const imageMap: Record<ImageKey, number> = {
	'bar_01.png': require('../../../assets/images/bar_01.png'),
	'bar_02.png': require('../../../assets/images/bar_02.png'),
	'bar_03.png': require('../../../assets/images/bar_03.png'),
	'bar_04.png': require('../../../assets/images/bar_04.png'),
};

const images = ['bar_01.png', 'bar_02.png', 'bar_03.png', 'bar_04.png'];

const ImageSlider = () => {
	const flatListRef = useRef<BottomSheetFlatListMethods>(null);
	const [activeIndex, setActiveIndex] = useState(0);
	const { width } = Dimensions.get('window');

	const handleEdgeTap = (event: GestureResponderEvent, index: number) => {
		const tapX = event.nativeEvent.locationX;

		if (tapX < width * 0.25 && index > 0) {
			console.log(`Left side`);
			flatListRef.current?.scrollToIndex({ index: index - 1, animated: true });
			setActiveIndex(index - 1);
		} else if (tapX > width * 0.55 && index < images.length - 1) {
			console.log(`Right side`);
			flatListRef.current?.scrollToIndex({ index: index + 1, animated: true });
			setActiveIndex(index + 1);
		} else {
		console.log(`Image ${index + 1} tapée (centre)`);
		}
	};

  return (
    <BottomSheetView style={styles.sliderContainer}>
		<BottomSheetFlatList
			ref={flatListRef}
			data={images}
			keyExtractor={(_, index) => index.toString()}
			horizontal
			scrollEnabled={false}
			showsHorizontalScrollIndicator={false}
			renderItem={({ item, index }) => (
				<Pressable
					onTouchStart={(e: GestureResponderEvent) => {
						e.stopPropagation();
						handleEdgeTap(e, index);
					}}
					style={[styles.imageContainer, { width: (width - (36 * 2)) }]}
				>
					<Image
						source={imageMap[item]}
						style={[styles.image, { width: (width - (36 * 2)), height: width / 2 }]}
					/>
				</Pressable>
			)}
			ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
		/>
      <View style={styles.pagination}>
        {images.map((_, index) => (
			<View
            key={index}
            style={[
				styles.dot,
				activeIndex === index && styles.activeDot,
            ]}
			/>
        ))}
      </View>
    </BottomSheetView>
  );
};

const styles = StyleSheet.create({
	sliderContainer: {
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		height: 'auto'
	},
	flatList: {
		position: 'relative',
		width: '100%'
	},
	imageContainer: {
		width: '100%'
	},
	image: {
		resizeMode: 'cover',
		borderRadius: 24
	},
	pagination: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 10,
	},
	dot: {
		width: 12,
		height: 12,
		borderRadius: 12,
		backgroundColor: lightTheme.textDark,
		opacity: 0.4,
		marginHorizontal: 4,
	},
	activeDot: {
		width: 12,
		height: 12,
		backgroundColor: lightTheme.textHighlightDark,
		opacity: 1,
	},
});

export default ImageSlider;