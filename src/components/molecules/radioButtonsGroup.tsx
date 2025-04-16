import React from 'react';
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

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({ options, selected, onSelect }) => {
    const styles = RadioButtonStyles();
    return (
    <View style={styles.container}>
        {options.map((option) => (
        <TouchableOpacity activeOpacity={1} key={option.value} style={styles.radioButton} onPress={() => onSelect(option.value)}
        >
            <Image source={option.image ? option.image : undefined} style={selected === option.value ? [styles.img, styles.selectedOption] : styles.img}/>
            <View style={selected === option.value ? [styles.radioCircle, styles.selectedOption] : styles.radioCircle}>
                {selected === option.value && <View style={styles.selectedRb} />}
            </View>
        </TouchableOpacity>
        ))}
    </View>
    );
};

export default RadioButtonGroup;