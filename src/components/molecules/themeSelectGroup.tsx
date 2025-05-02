import React, { useCallback } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import SelectionStyles from '../../styles/molecules/selectionStyles.tsx';

type RadioOption = {
  value: string;
  image?: any;
};

type ThemeSelectGroupProps = {
  options: RadioOption[];
  selected: string;
  onSelect: (value: string) => void;
};

const ThemeSelectGroup: React.FC<ThemeSelectGroupProps> = React.memo(({ options, selected, onSelect }) => {
  const styles = SelectionStyles();

  const handleSelect = useCallback((value: string) => {
    onSelect(value);
  }, [onSelect]);

  return (
    <View style={styles.container}>
      {options.map((option) => {
        const isSelected = selected === option.value;
        const imgStyle = isSelected ? [styles.imgThemes, styles.selectedOption] : styles.imgThemes;
        const radioCircleStyle = isSelected ? [styles.radioCircle, styles.selectedOption] : styles.radioCircle;

        return (
          <TouchableOpacity
            activeOpacity={1}
            key={option.value}
            style={styles.radioButton}
            onPress={() => handleSelect(option.value)}
          >
            {option.image && (
              <Image source={option.image} style={imgStyle} />
            )}
            <View style={radioCircleStyle}>
              {isSelected && <View style={styles.selectedRb} />}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
});

export default ThemeSelectGroup;
