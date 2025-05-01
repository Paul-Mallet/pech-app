import React from 'react';
import { Text, View } from 'react-native';
import GlobalStyles from '../../styles/base/globalStyles.tsx';
import SearchBarResultElement from '../atoms/searchBarResultElement.tsx';

interface ResultGroupProps {
    elementType: string;
    elements: string[];
}

const SearchBarResultGroup: React.FC<ResultGroupProps> = ({ elementType, elements}) => {
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
        </View>
    );
};

export default SearchBarResultGroup;