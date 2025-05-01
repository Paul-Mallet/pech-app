import React from 'react';
import { ScrollView } from 'react-native';
import GlobalStyles from '../../styles/base/globalStyles.tsx';
import SearchBarResultGroup from './searchBarResultGroup.tsx';

interface ElementType
{
  label: string;
  id: string;
}

interface ResultGroupProps {
    elementType: string;
    elements: ElementType[];
}

interface ResultListProps {
    elements: ResultGroupProps[];
    setPressedFish: (fishId: string) => void;
    setPressedLegislation: (legislationId: string) => void;
}

const SearchBarResults: React.FC<ResultListProps> = ({ elements, setPressedFish, setPressedLegislation}) => {
    const globalStyles = GlobalStyles();

    return (
        <ScrollView style={globalStyles.searchBarList}>
            {elements.map((group, index) => (
                <SearchBarResultGroup
                    key={index}
                    elementType={group.elementType}
                    elements={group.elements}
                    setPressedFish={setPressedFish}
                    setPressedLegislation={setPressedLegislation}
                />
            ))}
        </ScrollView>
    );
};

export default SearchBarResults;