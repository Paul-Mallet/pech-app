import { createContext, useContext, useState } from 'react';
import { lightTheme, darkTheme, poppinsFont, dyslexiaFont } from './Themes.tsx';

type ThemeType = typeof lightTheme;
type FontType = typeof poppinsFont;
interface ThemeContextType {
    theme: ThemeType;
    setThemeByName: (themeName: string) => void;
    toggleTheme: () => void;
    font: FontType;
    setFontByName: (fontName: string) => void;
    toggleFont: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);
  const [font, setFont] = useState(poppinsFont);

  const toggleTheme = () => {
    setTheme(prev => (prev.mode === 'light' ? darkTheme : lightTheme));
  };

  const setThemeByName = (themeName: string) => {
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
    <ThemeContext.Provider value={{ theme, setThemeByName, toggleTheme, font, setFontByName, toggleFont }}>
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
