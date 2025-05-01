import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import GlobalStyles from '../styles/base/globalStyles.tsx';
import { useTheme } from '../components/organisms/ThemeContext.tsx';
import ThemeSelectGroup from '../components/molecules/themeSelectGroup.tsx';
import FontSelectGroup from '../components/molecules/fontSelectGroup.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = ({ route }: { route: any }) => {
	const styles = GlobalStyles();
  const { selectedTheme, setThemeByName, setSelectedTheme, selectedFont, setFontByName, setSelectedFont } = useTheme();
  
  const options = [
    {
      value: 'light',
      image: require('../../assets/LightTheme.webp'),
    },
    {
      value: 'dark',
      image: require('../../assets/DarkTheme.webp'),
    },
  ];

  const fontOptions = [
    {
      value: 'Poppins',
    },
    {
      value: 'Dyslexic',
    },
  ];

  // used to remove the (not true) errors
  const safeAsyncStorage = AsyncStorage as unknown as {
    getItem: (key: string) => Promise<string | null>;
    setItem: (key: string, value: string) => Promise<void>;
  };

  const selectTheme = (option: string) =>
  {
    setThemeByName(option);
    setSelectedTheme(option);
    safeAsyncStorage.setItem('theme', option);
  }

  const selectFont = (option: string) =>
  {
    setFontByName(option);
    setSelectedFont(option);
    safeAsyncStorage.setItem('font', option);
  }

  return (
		<SafeAreaView style={styles.body}>
      <View style={[styles.homePanel, {paddingTop: 20, marginTop: 40}]}>
        <View>
          <Text style={[styles.h2, {marginBottom: 16}]}>Thème</Text>
          <ThemeSelectGroup
            options={options}
            selected={selectedTheme}
            onSelect={(option) => selectTheme(option)}
          />
          <Text style={[styles.h2, {marginBottom: 16}]}>Police</Text>
          <FontSelectGroup
            options={fontOptions}
            selected={selectedFont}
            onSelect={(option) => selectFont(option)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;