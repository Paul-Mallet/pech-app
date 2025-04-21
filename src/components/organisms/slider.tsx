import React, { useState, useRef } from 'react';
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  Pressable,
  GestureResponderEvent,
  TouchableOpacity,
  Text
} from 'react-native';
import { BottomSheetFlatList, BottomSheetView } from '@gorhom/bottom-sheet';
import type { BottomSheetFlatListMethods } from '@gorhom/bottom-sheet';
import BottomSheetStyles from '../../styles/organisms/bottomSheetStyles.tsx';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from './ThemeContext.tsx';

type ImageKey = 'bar_01.png' | 'bar_02.png' | 'bar_03.png' | 'bar_04.png';

const imageMap: Record<ImageKey, number> = {
	'bar_01.png': require('../../../assets/images/bar_01.png'),
	'bar_02.png': require('../../../assets/images/bar_02.png'),
	'bar_03.png': require('../../../assets/images/bar_03.png'),
	'bar_04.png': require('../../../assets/images/bar_04.png'),
};

const images = ['bar_01.png', 'bar_02.png', 'bar_03.png', 'bar_04.png'];

const ImageSlider = () => {
    const { theme } = useTheme();
	const styles = BottomSheetStyles();
	const flatListRef = useRef<BottomSheetFlatListMethods>(null);
	const [activeIndex, setActiveIndex] = useState(0);
	const { width } = Dimensions.get('window');

	const clickLeft = (index: number) =>
	{
		console.log(`Left side`);
		flatListRef.current?.scrollToIndex({ index: index - 1, animated: true });
		setActiveIndex(index - 1);
	}
	const clickRight = (index: number) =>
	{
		console.log(`Right side`);
		flatListRef.current?.scrollToIndex({ index: index + 1, animated: true });
		setActiveIndex(index + 1);
	}

	const handleEdgeTap = (event: GestureResponderEvent, index: number) => {
		const tapX = event.nativeEvent.locationX;

		if (tapX < width * 0.25 && index > 0) {
			clickLeft(index);
		} else if (tapX > width * 0.55 && index < images.length - 1) {
			clickRight(index);
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
		<TouchableOpacity onPress={() => { if (activeIndex < images.length - 1) clickRight(activeIndex); }} style={{transform: [{ translateY: -30 }], position: 'absolute', top: '50%', right: -32, justifyContent: 'center', alignItems: 'center'}}>
			<Ionicons name='caret-forward' size={40} color={theme.textHighlightDark}/>
		</TouchableOpacity>
		<TouchableOpacity onPress={() => { if (activeIndex > 0) clickLeft(activeIndex); }} style={{transform: [{ translateY: -30 }], position: 'absolute', top: '50%', left: -32, justifyContent: 'center', alignItems: 'center'}}>
			<Ionicons name='caret-back' size={40} color={theme.textHighlightDark}/>
		</TouchableOpacity>
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

export default ImageSlider;