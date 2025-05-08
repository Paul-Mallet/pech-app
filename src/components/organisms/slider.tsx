import React, { useState, useRef, useCallback, useMemo } from 'react';
import {
  View,
  Image,
  Dimensions,
  Pressable,
  GestureResponderEvent,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from './ThemeContext.tsx';
import BottomSheetStyles from '../../styles/organisms/bottomSheetStyles.tsx';
import { API_BASE_URL } from '../../services/fish.service.tsx';
import { SliderProps } from '../../models/fish.model.tsx';

const { width: screenWidth } = Dimensions.get('window');
const IMAGE_WIDTH = screenWidth - 72;

const ImageSlider = ({ images }: SliderProps) => {
  const { theme } = useTheme();
  const styles = BottomSheetStyles();
  const flatListRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = useCallback((index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
    setActiveIndex(index);
  }, []);

  const handleEdgeTap = useCallback((e: GestureResponderEvent, index: number) => {
    const tapX = e.nativeEvent.locationX;

    if (tapX < screenWidth * 0.25 && index > 0) {
      scrollToIndex(index - 1);
    } else if (tapX > screenWidth * 0.55 && index < images.length - 1) {
      scrollToIndex(index + 1);
    }
  }, [scrollToIndex, images.length]);

  const renderItem = useCallback(({ item, index }: { item: string; index: number }) => (
    <Pressable
      onTouchStart={(e: GestureResponderEvent) => {
        e.stopPropagation();
        handleEdgeTap(e, index);
      }}
      style={[styles.imageContainer, { width: screenWidth }]}
    >
      <Image
        source={{ uri: API_BASE_URL + item }}
        style={[styles.image, { width: IMAGE_WIDTH, height: screenWidth / 2 }]}
      />
    </Pressable>
  ), [handleEdgeTap]);

  const getItemLayout = useCallback((_: any, index: number) => ({
    length: screenWidth + 12, // item width + separator
    offset: (screenWidth + 12) * index,
    index,
  }), []);

  return (
    <View style={styles.sliderContainer}>
      <FlatList
        ref={flatListRef}
        data={images}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
        getItemLayout={getItemLayout}
      />
      {activeIndex < images.length - 1 && (
        <TouchableOpacity
          onPress={() => scrollToIndex(activeIndex + 1)}
          style={styles.imageSliderButton}
        >
          <Ionicons name="caret-forward" size={40} color={theme.textHighlightDark} />
        </TouchableOpacity>
      )}
      {activeIndex > 0 && (
        <TouchableOpacity
          onPress={() => scrollToIndex(activeIndex - 1)}
          style={styles.imageSliderButton}
        >
          <Ionicons name="caret-back" size={40} color={theme.textHighlightDark} />
        </TouchableOpacity>
      )}
      <View style={styles.pagination}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, activeIndex === index && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
};

export default ImageSlider;
