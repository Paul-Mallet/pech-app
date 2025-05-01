import React, { useState, useRef, useCallback, useEffect } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import SearchBarResults from '../molecules/searchBarResult.tsx';
import GlobalStyles from '../../styles/base/globalStyles.tsx';        
import { useTheme } from './ThemeContext.tsx';
import { Ionicons } from '@expo/vector-icons';
import { useHistory } from './HistoryContext.tsx';

interface ElementType {
  label: string;
  id: string;
}

interface ResultGroupProps {
  elementType: string;
  elements: ElementType[];
}

const SearchBar = ({ setPressedFish, setPressedLegislation }: { setPressedFish: (fishId: string) => void, setPressedLegislation: React.Dispatch<React.SetStateAction<string | null>> }) => {
	const { fishes, legislations } = useHistory();
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [searchText, setSearchText] = useState('');
  const { theme } = useTheme();
  const styles = GlobalStyles();
  const [data, setData] = useState<ResultGroupProps[]>([]);
  const [triggerSearch, setTriggerSearch] = useState(0);

  const debounceTimerRef = useRef<number | null>(null);

  function getFilteredFishElements(searchText: string): ElementType[] {
    const lowerSearch = searchText.toLowerCase();
    
    return fishes
      .filter(fish => fish.name.toLowerCase().includes(lowerSearch))
      .map(fish => ({
        label: fish.name,
        id: fish.id.toString(),
      }));
  }

  function getFilteredLegislationElements(searchText: string): ElementType[] {
    const lowerSearch = searchText.toLowerCase();
    
    return legislations
    .filter(legislation =>
      legislation.article.toLowerCase().includes(lowerSearch) ||
      legislation.title.toLowerCase().includes(lowerSearch)
    )
    .map(legislation => ({
      label: legislation.article,
      id: legislation.id.toString(),
    }));
  }

  function getFishResultGroup(searchText: string): ResultGroupProps[] {
    const filteredFish = getFilteredFishElements(searchText);
    const filteredLegislation = getFilteredLegislationElements(searchText);
    return [
      {
        elementType: 'Poissons',
        elements: filteredFish,
      },
      {
        elementType: 'Legislations',
        elements: filteredLegislation,
      },
      // You can add more groups here if needed
    ];
  }

  useEffect(() => {
    if (fishes.length > 0 && searchText.length > 0) {
      setData(getFishResultGroup(searchText));
      setShowResults(true);
    }
  }, [triggerSearch, searchText]);

  const handleSearch = useCallback((text: string) => {
    setSearchText(text);
    if (text.length < 1)
    {
      setShowResults(false);
      setData([]);
      return;
    }
    setTriggerSearch(prev => prev++);
    console.log('User typed:', text);
  }, []);

  const handleTextChange = (text: string) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => handleSearch(text), 500);
  };

  const searchBarStyle = isFocused
    ? [styles.searchBar, styles.searchBarFocused]
    : styles.searchBar;

  return (
    <View style={[searchBarStyle, showResults && { zIndex: 1, elevation: 1 }]}>
      <View style={styles.searchBarTopItems}>
        <TouchableOpacity onPress={() => setShowResults(prev => !prev)}>
          <Ionicons
            name="search"
            size={24}
            color={showResults ? theme.textHighlightSearch : theme.iconColor}
            style={styles.searchBarIconLeft}
          />
        </TouchableOpacity>
        <TextInput
          style={[styles.textDark, styles.input]}
          placeholder="Rechercher..."
          placeholderTextColor={theme.inputPlaceholder}
          onChangeText={handleTextChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
      {showResults && <SearchBarResults elements={data} setPressedFish={setPressedFish} setPressedLegislation={setPressedLegislation} />}
    </View>
  );
};

export default SearchBar;
