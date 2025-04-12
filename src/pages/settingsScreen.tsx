import React, { useState } from 'react';
import { View, Text, Button, SafeAreaView } from 'react-native';
import GlobalStyles from '../styles/base/globalStyles.tsx';
import { useTheme } from '../styles/base/ThemeContext.tsx';
import RadioButtonGroup from '../components/molecules/radioButtonsGroup.tsx';

const optionsTheme = ['Light', 'Dark'];
// const [selectedTheme, setSelectedTheme] = useState('');

const SettingsScreen = ({ route }: { route: any }) => {
	const styles = GlobalStyles();
  const { theme, setThemeByName, toggleTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState('light');
  
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

  return (
		<SafeAreaView style={[styles.body, styles.homePanel]}>
      <View>
        <Text style={styles.h2}>Thèmes</Text>
        <View>
          {/* <Button title="Toggle Theme" onPress={toggleTheme} /> */}
          <RadioButtonGroup
            options={options}
            selected={selectedTheme}
            onSelect={(option) => {setThemeByName(option);setSelectedTheme(option);}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;