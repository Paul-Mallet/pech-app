import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import GlobalStyles from '../../styles/base/globalStyles.tsx';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../styles/base/ThemeContext.tsx';
import { useNavigation } from '@react-navigation/native';

interface ResultGroupProps {
    text: string;
    // visible: boolean;
    // setVisible: (visible: boolean) => void;
}

const SearchBarResultElement: React.FC<ResultGroupProps> = ({ text }) => {
    const { theme } = useTheme();
    const globalStyles = GlobalStyles();
    const navigation = useNavigation();

    const handleRightIconPress = (text: string) => {
        navigation.navigate('Tabs', {
            screen: 'Législation',
            params: { searchText: text },
        });
    };
    const handleTextPress = (text: string) => {

        // call the function to show the fish card

        // navigation.navigate('Tabs', {
        //     screen: 'Législation',
        //     params: { searchText: text },
        // });
    };

    return (
        <View style={globalStyles.searchBarGroupElement}>
            <TouchableOpacity onPress={() => handleTextPress(text)}>
                <Text style={globalStyles.searchBarGroupElementText}>{text}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRightIconPress(text)}>
                <Ionicons name="book-outline" size={22} color={theme.textDark} />
            </TouchableOpacity>
        </View>
    );
};

export default SearchBarResultElement;