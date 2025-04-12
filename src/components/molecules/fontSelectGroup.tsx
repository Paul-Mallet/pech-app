import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import FontSelectStyles from '../../styles/organisms/fontSelectStyles.tsx';
import { useTheme } from '../../styles/base/ThemeContext.tsx';

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
    const styles = FontSelectStyles();
    return (
    <View style={styles.container}>
        {options.map((option) => (
        <TouchableOpacity activeOpacity={1} key={option.value} style={styles.radioButton} onPress={() => onSelect(option.value)}>
            <View style={selected === option.value ? [styles.img, styles.selectedOption] : styles.img}>
                <Text style={{fontSize: 20, fontFamily: option.value + "Bold", lineHeight: 35, textAlign: 'center', color: theme.textDark}}>{option.value}</Text>
                <Text style={{fontSize: 16, fontFamily: option.value + "Regular", paddingLeft: 4, color: theme.textDark}}>{option.value}</Text>
                <Text style={{fontSize: 12, fontFamily: option.value + "Regular", paddingLeft: 4, color: theme.textDark}}>Lorem ipsum dolor sit amet, consectetur...,</Text>
            </View>
            <View style={selected === option.value ? [styles.radioCircle, styles.selectedOption] : styles.radioCircle}>
                {selected === option.value && <View style={styles.selectedRb} />}
            </View>
        </TouchableOpacity>
        ))}
    </View>
    );
};

export default FontSelectGroup;