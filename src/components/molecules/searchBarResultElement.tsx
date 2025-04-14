import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import GlobalStyles from '../../styles/base/globalStyles.tsx';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../styles/base/ThemeContext.tsx';

interface ResultGroupProps {
    text: string;
    // visible: boolean;
    // setVisible: (visible: boolean) => void;
}
const handleRightIconPress = () => {
    // navigation.navigate('Quizz');
    // console.log('Right icon pressed');
    // setSearchText('');
  };

const SearchBarResultElement: React.FC<ResultGroupProps> = ({ text}) => {
    const { theme } = useTheme();
    const globalStyles = GlobalStyles();

    return (
        <View style={globalStyles.searchBarGroupElement}>
            <TouchableOpacity>
                <Text style={globalStyles.searchBarGroupElementText}>{text}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleRightIconPress}>
                <Ionicons name="book-outline" size={22} color={theme.textDark} />
            </TouchableOpacity>
        </View>
    );
};

export default SearchBarResultElement;