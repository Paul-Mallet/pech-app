import React, { useState } from 'react';
import { View, Text, Button, SafeAreaView } from 'react-native';
import GlobalStyles from '../styles/base/globalStyles.tsx';
import { useTheme } from '../styles/base/ThemeContext.tsx';
import RadioButtonGroup from '../components/molecules/radioButtonsGroup.tsx';
import FontSelectGroup from '../components/molecules/fontSelectGroup.tsx';

const optionsTheme = ['Light', 'Dark'];

const SettingsScreen = ({ route }: { route: any }) => {
	const styles = GlobalStyles();
  const { theme, setThemeByName, font, setFontByName } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState('light');
  const [selectedFont, setSelectedFont] = useState('Poppins');
  
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

  return (
		<SafeAreaView style={styles.body}>
      <View style={[styles.homePanel, {paddingTop: 20}]}>
        <View>
          <Text style={styles.titleDark}>Thème</Text>
          <RadioButtonGroup
            options={options}
            selected={selectedTheme}
            onSelect={(option) => {setThemeByName(option); setSelectedTheme(option);}}
          />
          <Text style={styles.titleDark}>Police</Text>
          <FontSelectGroup
            options={fontOptions}
            selected={selectedFont}
            onSelect={(option) => {setFontByName(option); setSelectedFont(option);}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;