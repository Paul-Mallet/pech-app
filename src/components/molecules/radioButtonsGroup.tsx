import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useTheme } from '../../styles/base/ThemeContext.tsx';

type RadioOption = {
    value: string;
    image?: any; // Can be a require or URI source
};

type RadioButtonGroupProps = {
    options: RadioOption[];
    selected: string;
    onSelect: (value: string) => void;
  };
  
  // ✅ Use props correctly in the component
const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({ options, selected, onSelect }) => {
    const { theme } = useTheme();
    return (
    <View style={styles.container}>
        {options.map((option) => (
        <TouchableOpacity
            key={option.value}
            style={styles.radioButton}
            onPress={() => onSelect(option.value)}
        >
            <Image source={option.image ? option.image : undefined} style={styles.img}/>
            <View style={styles.radioCircle}>
                {selected === option.value && <View style={styles.selectedRb} />}
            </View>
        </TouchableOpacity>
        ))}
    </View>
    );
};

export default RadioButtonGroup;

const styles = StyleSheet.create({
    img: {
        borderColor: "#00000030",
        padding: 10,
        borderWidth: 2,
        borderRadius: 16,
        width: 100,
        height: 150,
    },
    container: {
        justifyContent: 'space-between',
        padding: 20,
        flexDirection: 'row',
        textAlign: 'center',
    },
    radioButton: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 15,
    },
    radioCircle: {
        marginTop: 10,
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#444',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedRb: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#444',
    },
    radioText: {
        fontSize: 16,
    },
});
