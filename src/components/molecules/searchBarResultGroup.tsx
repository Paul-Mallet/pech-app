import React from 'react';
import { Text, View } from 'react-native';
import GlobalStyles from '../../styles/base/globalStyles.tsx';
import { Ionicons } from '@expo/vector-icons';
import SearchBarResultElement from './searchBarResultElement.tsx';
import { useTheme } from '../organisms/ThemeContext.tsx';

interface ResultGroupProps {
    elementType: string;
    elements: string[];
    // visible: boolean;
    // setVisible: (visible: boolean) => void;
}

const SearchBarResultGroup: React.FC<ResultGroupProps> = ({ elementType, elements/*, visible, setVisible */}) => {
    const { theme } = useTheme();
    const globalStyles = GlobalStyles();

    return (
        <View style={globalStyles.searchBarListGroup}>
            <Text style={globalStyles.searchBarGroupTitle}>{elementType}</Text>
            {elements.map((group, index) => (
                <SearchBarResultElement
                    key={index}
                    text={group}
                />
            ))}
            <Ionicons name="book" size={24} color={theme.searchBarBackground} />
        </View>
    );
};

export default SearchBarResultGroup;