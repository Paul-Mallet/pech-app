import React from 'react';
import { Text, View } from 'react-native';
import GlobalStyles from '../../styles/base/globalStyles.tsx';
import SearchBarResultElement from '../atoms/searchBarResultElement.tsx';

interface ElementType
{
  label: string;
  id: string;
}

interface ResultGroupProps {
    elementType: string;
    elements: ElementType[];
    setPressedFish: (fishId: string) => void;
    setPressedLegislation: (legislationId: string) => void;
}

const SearchBarResultGroup: React.FC<ResultGroupProps> = ({ elementType, elements, setPressedFish, setPressedLegislation}) => {
    const globalStyles = GlobalStyles();

    const handlePress = (text: string) => {
        if (elementType === 'Poissons') {
            setPressedFish(text);
        } else if (elementType === 'Législations') {
            setPressedLegislation(text);
        }
        // Add other condition checks for other elementTypes if necessary
      };

    return (elements.length > 0 && 
        <View style={globalStyles.searchBarListGroup}>
            <Text style={globalStyles.searchBarGroupTitle}>{elementType}</Text>
            {elements.map((element, index) => (
                <SearchBarResultElement
                    key={index}
                    text={element.label}
                    callBack={() => handlePress(element.id)}
                />
            ))}
        </View>
    );
};

export default SearchBarResultGroup;