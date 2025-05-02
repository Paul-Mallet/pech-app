import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../organisms/ThemeContext.tsx';
import SelectionStyles from '../../styles/molecules/selectionStyles.tsx';

type RadioOption = {
    value: string;
};

type FontSelectGroupProps = {
    options: RadioOption[];
    selected: string;
    onSelect: (value: string) => void;
  };

const FontSelectGroup: React.FC<FontSelectGroupProps> = ({ options, selected, onSelect }) => {
    const { theme } = useTheme();
    const styles = SelectionStyles();

    return (
        <View style={styles.container}>
            {options.map((option: RadioOption) => (
            <TouchableOpacity activeOpacity={1} key={option.value} style={styles.radioButton} onPress={() => onSelect(option.value)}>
                <View style={selected === option.value ? [styles.imgFonts, styles.selectedOption] : styles.imgFonts}>
                    <Text
                        style={[
                            styles.fonts,
                            styles.fontTitle,
                            {fontFamily: option.value + "Bold"}
                        ]}
                    >
                            {option.value}
                    </Text>
                    <Text
                        style={[
                            styles.fonts,
                            styles.fontSubTitle,
                            {fontFamily: option.value + "Regular"}
                        ]}
                    >
                            {option.value}
                    </Text>
                    <Text
                        style={[
                            styles.fonts,
                            styles.fontParagraph,
                            {fontFamily: option.value + "Regular"}
                        ]}
                    >
                        Lorem ipsum dolor sit amet, consectetur...
                    </Text>
                </View>
                <View
                    style={selected === option.value
                        ? [styles.radioCircle, styles.selectedOption]
                        : styles.radioCircle}>
                    {selected === option.value
                        && <View style={styles.selectedRb} />}
                </View>
            </TouchableOpacity>
            ))}
        </View>
    );
};

export default FontSelectGroup;