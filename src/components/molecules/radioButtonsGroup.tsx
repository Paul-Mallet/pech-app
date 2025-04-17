import React, { useCallback } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import RadioButtonStyles from '../../styles/organisms/radioButtonStyles.tsx';

type RadioOption = {
  value: string;
  image?: any; // Can be a require or URI source
};

type RadioButtonGroupProps = {
  options: RadioOption[];
  selected: string;
  onSelect: (value: string) => void;
};

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = React.memo(({ options, selected, onSelect }) => {
  const styles = RadioButtonStyles();

  const handleSelect = useCallback((value: string) => {
    onSelect(value);
  }, [onSelect]);

  return (
    <View style={styles.container}>
      {options.map((option) => {
        const isSelected = selected === option.value;
        const imgStyle = isSelected ? [styles.img, styles.selectedOption] : styles.img;
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

export default RadioButtonGroup;
