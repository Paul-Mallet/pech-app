import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import GlobalStyles from '../../styles/base/globalStyles.tsx';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../organisms/ThemeContext.tsx';

interface ResultGroupProps {
    text: string;
    callBack: () => void;
}

const SearchBarResultElement: React.FC<ResultGroupProps> = ({ text, callBack }) => {
    const { theme } = useTheme();
    const globalStyles = GlobalStyles();
    const navigation = useNavigation();

    const handleRightIconPress = (text: string) => {
        navigation.navigate('Tabs', {
            screen: 'Législation',
            params: { searchText: text },
        });
    };

    return (
        <View style={globalStyles.searchBarGroupElement}>
            <TouchableOpacity onPress={() => callBack()} style={{ flex: 1}}>
                <Text numberOfLines={1} ellipsizeMode="tail" style={globalStyles.searchBarGroupElementText}>{text}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRightIconPress(text)}>
                <Ionicons name="book-outline" size={22} color={theme.textDark} />
            </TouchableOpacity>
        </View>
    );
};

export default SearchBarResultElement;