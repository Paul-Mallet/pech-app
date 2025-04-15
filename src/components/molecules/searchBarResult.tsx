import React from 'react';
import { ScrollView, View } from 'react-native';
import GlobalStyles from '../../styles/base/globalStyles.tsx';
import SearchBarResultGroup from './searchBarResultGroup.tsx';

interface ResultGroupProps {
    elementType: string;
    elements: string[];
}

interface ResultListProps {
    elements: ResultGroupProps[];
}

const SearchBarResults: React.FC<ResultListProps> = ({ elements}) => {
    const globalStyles = GlobalStyles();

    return (
        <ScrollView style={globalStyles.searchBarList}>
            {elements.map((group, index) => (
                <SearchBarResultGroup
                    key={index}
                    elementType={group.elementType}
                    elements={group.elements}
                />
            ))}
        </ScrollView>
    );
};

export default SearchBarResults;