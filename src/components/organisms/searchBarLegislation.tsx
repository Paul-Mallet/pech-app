import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GlobalStyles from '../../styles/base/globalStyles.tsx';
import Colors from '../../styles/base/colors.tsx';
interface SearchBarLegislationProps {
  searchText: string;
  setSearchText: (text: string) => void;
}

const SearchBarLegislation = ({ searchText, setSearchText }: SearchBarLegislationProps) => {
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
    ? [GlobalStyles.searchBar, GlobalStyles.searchBarFocused]
    : GlobalStyles.searchBar;

  return (
    <View style={searchBarStyle}>
      <Ionicons name="search" size={24} color={Colors.textDark} style={GlobalStyles.searchBarIconLeft} />
      <TextInput
        style={[GlobalStyles.textDark, GlobalStyles.input]}
        placeholder="Rechercher..."
        placeholderTextColor={Colors.inputPlaceholder}
        onChangeText={handleTextChange}
        value={searchText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <TouchableOpacity onPress={handleRightIconPress}>
        <Ionicons name="close" size={26} color={Colors.textHighlightDark} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBarLegislation;
