import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GlobalStyles from '../../styles/base/globalStyles.tsx';
import { useTheme } from '../../styles/base/ThemeContext.tsx';
interface SearchBarLegislationProps {
  searchText: string;
  setSearchText: (text: string) => void;
}

const SearchBarLegislation = ({ searchText, setSearchText }: SearchBarLegislationProps) => {
  const { theme } = useTheme();
	const styles = GlobalStyles();
  const [debounceTimer, setDebounceTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (text: string) => {
    if (text.length < 2) return;
    console.log('User typed:', text);
  };

  const handleRightIconPress = () => {
    setSearchText('');
  };

  const handleTextChange = (text: string) => {
    setSearchText(text);
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    const timer = setTimeout(() => handleSearch(text), 500);
    setDebounceTimer(timer);
  };

  const searchBarStyle = isFocused
    ? [styles.searchBar, styles.searchBarFocused]
    : styles.searchBar;

  return (
    <View style={searchBarStyle}>
      <View style={styles.searchBarTopItems}>
        <Ionicons name="search" size={24} color={theme.textDark} style={styles.searchBarIconLeft} />
        <TextInput
          style={[styles.textDark, styles.input]}
          placeholder="Rechercher..."
          placeholderTextColor={theme.inputPlaceholder}
          onChangeText={handleTextChange}
          value={searchText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <TouchableOpacity onPress={handleRightIconPress}>
          <Ionicons name="close" size={26} color={theme.textHighlightDark} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchBarLegislation;
