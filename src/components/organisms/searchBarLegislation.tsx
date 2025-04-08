import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GlobalStyles from '../../styles/base/globalStyles.tsx';
import Colors from '../../styles/base/colors.tsx';

const SearchBarLegislation = () => {
  const [debounceTimer, setDebounceTimer] = useState<number | null>(null);
  const [searchText, setSearchText] = useState('');
  const handleSearch = (text: string) => {
    if (text.length < 2)
      return;
    console.log('User typed:', text);
  };

  const handleRightIconPress = () => {
    console.log('Right icon pressed');
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

  return (
    <View style={GlobalStyles.searchBar}>
      <Ionicons name="search" size={24} color={Colors.textDark} style={GlobalStyles.searchBarIconLeft} />
      <TextInput
        style={[GlobalStyles.textDark, GlobalStyles.input]}
        placeholder="Rechercher..."
        placeholderTextColor= {Colors.inputPlaceholder}
        onChangeText={handleTextChange}
        value={searchText}
      />
      <TouchableOpacity onPress={handleRightIconPress}>
        <Ionicons name="close" size={26} color={Colors.textHighlightDark} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBarLegislation;
