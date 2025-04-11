import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GlobalStyles from '../../styles/base/globalStyles.tsx';
import Colors from '../../styles/base/colors.tsx';
import FishResearch from '../../pages/fishResearchScreen.tsx';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// type navStackParam = {
//   FishResearch: undefined;
// }

const SearchBar = ({navigation} : any) => {
  const [debounceTimer, setDebounceTimer] = useState<number | null>(null);
  const [searchText, setSearchText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // const navigation = useNavigation<StackNavigationProp<navStackParam, 'FishResearch'>>();

  const handleSearch = (text: string) => {
    if (text.length < 2)
      return;
    console.log('User typed:', text);
  };

  const handleRightIconPress = () => {
    setSearchText('');
    navigation.navigate('FishResearch');
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
        placeholderTextColor= {Colors.inputPlaceholder}
        onChangeText={handleTextChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <TouchableOpacity style={GlobalStyles.searchBarButtonRight} onPress={handleRightIconPress}>
        <Ionicons name="list" size={26} color={Colors.searchBarBackground} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
