import { useState, useRef, useCallback, useEffect } from 'react';
import * as React from 'react';
import { View, TextInput, TouchableOpacity, BackHandler } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SearchBarResults from '../molecules/searchBarResult.tsx';
import { useTheme } from './ThemeContext.tsx';
import GlobalStyles from '../../styles/base/globalStyles.tsx';
import { useHistory } from './HistoryContext.tsx';
import { useFocusEffect } from '@react-navigation/native';

interface ElementType {
  label: string;
  id: string;
}

interface ResultGroupProps {
  elementType: string;
  elements: ElementType[];
}

interface SearchBarProps {
  setPressedFish: (fishId: string) => void;
  setPressedLegislation: (legislationId: string) => void;
}

const SearchBar = ({ setPressedFish, setPressedLegislation }: SearchBarProps) => {
  const { fishes, legislations } = useHistory();
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState<ResultGroupProps[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { theme } = useTheme();
  const styles = GlobalStyles();
  const inputRef = useRef<TextInput>(null);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setShowResults(false);
      };
    }, [])
  );

  const focusSearchBar = () =>
  {
    if (!isFocused && inputRef.current)
    {
      setIsFocused(true);
      setShowResults(true);
    }
  }

  useEffect(() => {
    const onBackPress = () => {
      if (isFocused && inputRef.current) {
        inputRef.current.blur();
        setShowResults(false);
        return true;
      }
      return false;
    };
  
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, [isFocused]);

  const getResultGroups = useCallback((text: string): ResultGroupProps[] => {
    const lowerSearch = text.toLowerCase();

    const filteredFish = fishes
      .filter(fish => fish.name.toLowerCase().includes(lowerSearch))
      .map(fish => ({ label: fish.name, id: fish.id.toString() }));

    const filteredLegislation = legislations
      .filter(leg =>
        leg.article.toLowerCase().includes(lowerSearch) ||
        leg.title.toLowerCase().includes(lowerSearch)
      )
      .map(leg => ({ label: leg.title, id: leg.id.toString() }));

    return [
      { elementType: 'Poissons', elements: filteredFish },
      { elementType: 'Législations', elements: filteredLegislation },
    ];
  }, [fishes, legislations]);

  const handleTextChange = (text: string) => {
    setSearchText(text);
    if (text.length === 0) {
      setShowResults(false);
      setData([]);
    } else {
      setData(getResultGroups(text));
      setShowResults(true);
    }
  };

  const handleRightIconPress = () => {
    setSearchText('');
    setShowResults(false);
    setData([]);
  };

  const searchBarStyle = [isFocused
    ? [styles.searchBar, styles.searchBarFocused]
    : styles.searchBar, { zIndex: 1, elevation: 1 }];

  return (
    <View style={searchBarStyle}>
      <View style={styles.searchBarTopItems}>
        <TouchableOpacity onPress={() => setShowResults(prev => !prev)}>
          <Ionicons name="search" size={24}
            color={showResults ? theme.textHighlightSearch : theme.textHighlightDark}
            style={styles.searchBarIconLeft}
          />
        </TouchableOpacity>
        <TextInput
          ref={inputRef}
          style={[styles.textDark, styles.input]}
          placeholder="Rechercher..."
          placeholderTextColor={theme.inputPlaceholder}
          value={searchText}
          onChangeText={handleTextChange}
          onFocus={() => focusSearchBar()}
          onBlur={() => setIsFocused(false)}
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={handleRightIconPress}>
            <Ionicons name="close" size={26} color={theme.textHighlightDark} />
          </TouchableOpacity>
        )}
      </View>
      {showResults && (
        <SearchBarResults
          elements={data}
          setPressedFish={setPressedFish}
          setPressedLegislation={setPressedLegislation}
        />
      )}
    </View>
  );
};

export default SearchBar;
