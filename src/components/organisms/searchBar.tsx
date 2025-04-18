import React, { useState, useRef, useCallback } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SearchBarResults from '../molecules/searchBarResult.tsx';
import GlobalStyles from '../../styles/base/globalStyles.tsx';        
import { useTheme } from './ThemeContext.tsx';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

interface ResultGroupProps {
  elementType: string;
  elements: string[];
}

const data: ResultGroupProps[] = [
  { elementType: 'Poissons', elements: ['Poisson 1', 'Poisson 2', 'Poisson 3'] },
  { elementType: 'Fruit', elements: ['Apple', 'Banana', 'Orange'] },
  { elementType: 'Autre', elements: ['Autre 1', 'Autre 2', 'Autre 3'] },
];

const SearchBar = () => {
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();
  const { theme } = useTheme();
  const styles = GlobalStyles();

  const debounceTimerRef = useRef<number | null>(null);

  const handleSearch = useCallback((text: string) => {
    if (text.length < 2) return;
    console.log('User typed:', text);
  }, []);

  const handleRightIconPress = () => {
    setSearchText('');
    navigation.navigate('FishResearch');
  };

  const handleTextChange = (text: string) => {
    setSearchText(text);
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => handleSearch(text), 500);
  };

  const searchBarStyle = isFocused
    ? [styles.searchBar, styles.searchBarFocused]
    : styles.searchBar;

  return (
    <View style={searchBarStyle}>
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
        <TouchableOpacity style={styles.searchBarButtonRight} onPress={handleRightIconPress}>
          {/* <Ionicons name="list" size={26} color={theme.iconColor} /> */}
          <FontAwesome name="filter" size={20} color={theme.textBoldLight} />
        </TouchableOpacity>
      </View>
      {showResults && <SearchBarResults elements={data} />}
    </View>
  );
};

export default SearchBar;
