import { createContext, useContext, useEffect, useState } from 'react';
import { lightTheme, darkTheme, poppinsFont, dyslexiaFont } from '../../styles/base/Themes.tsx';
import { StatusBar } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';

type ThemeType = typeof lightTheme;
type FontType = typeof poppinsFont;
interface ThemeContextType {
    theme: ThemeType;
    setSelectedTheme: (themeName: string) => void;
    selectedTheme: string;
    setThemeByName: (themeName: string) => void;
    toggleTheme: () => void;
    font: FontType;
    setFontByName: (fontName: string) => void;
    selectedFont: string;
    setSelectedFont: (fontName: string) => void;
    toggleFont: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);
  const [font, setFont] = useState(poppinsFont);
  const [selectedTheme, setSelectedTheme] = useState('light');
  const [selectedFont, setSelectedFont] = useState('Poppins');
  StatusBar.setBarStyle(theme === lightTheme ? 'dark-content' : 'light-content');
  StatusBar.setBackgroundColor(theme.body);
  NavigationBar.setBackgroundColorAsync(theme.navBarBackground);
  NavigationBar.setButtonStyleAsync(theme === lightTheme ? 'dark': 'light');

  const toggleTheme = () => {
    setTheme(prev => (prev.mode === 'light' ? darkTheme : lightTheme));
  };

  const setThemeByName = (themeName: string, isLoading?: false) => {
    if (themeName === 'dark') {
      setTheme(darkTheme);
    } else if (themeName === 'light') {
      setTheme(lightTheme);
    }
  };

  const setFontByName = (fontName: string) => {
    if (fontName === 'Poppins') {
      setFont(poppinsFont);
    } else if (fontName === 'Dyslexic') {
      setFont(dyslexiaFont);
    }
  };

  const toggleFont = () => {
    setFont(prev => (prev.mode === 'Poppins' ? dyslexiaFont : poppinsFont));
  };

  return (
    <ThemeContext.Provider value={{ theme, setSelectedTheme, selectedTheme, setThemeByName, toggleTheme, font, setSelectedFont, selectedFont, setFontByName, toggleFont }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
