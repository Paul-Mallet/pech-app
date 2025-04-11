import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GlobalStyles from '../../styles/base/globalStyles.tsx';
import { useTheme } from '../../styles/base/ThemeContext.tsx';
import { useNavigation } from '@react-navigation/native';

const SearchBar = () => {
  const { theme } = useTheme();
	const styles = GlobalStyles();
	const navigation = useNavigation();
  const [debounceTimer, setDebounceTimer] = useState<number | null>(null);
  const [searchText, setSearchText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const handleSearch = (text: string) => {
    if (text.length < 2)
      return;
    console.log('User typed:', text);
  };

  const handleRightIconPress = () => {
    navigation.navigate('Quizz');
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
  
  const searchBarStyle = isFocused
    ? [styles.searchBar, styles.searchBarFocused]
    : styles.searchBar;

  return (
    <View style={searchBarStyle}>
      <Ionicons name="search" size={24} color={theme.textDark} style={styles.searchBarIconLeft} />
      <TextInput
        style={[styles.textDark, styles.input]}
        placeholder="Rechercher..."
        placeholderTextColor= {theme.inputPlaceholder}
        onChangeText={handleTextChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <TouchableOpacity style={styles.searchBarButtonRight} onPress={handleRightIconPress}>
        <Ionicons name="list" size={26} color={theme.searchBarBackground} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
