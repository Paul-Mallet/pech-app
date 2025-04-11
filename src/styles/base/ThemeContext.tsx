import { createContext, useContext, useState } from 'react';
import { lightTheme, darkTheme, poppinsFont, otherFont } from './Themes.tsx';

type ThemeType = typeof lightTheme;
type FontType = typeof poppinsFont;
interface ThemeContextType {
    theme: ThemeType;
    toggleTheme: () => void;
    font: FontType;
    toggleFont: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);
  const [font, setFont] = useState(poppinsFont);

  const toggleTheme = () => {
    setTheme(prev => (prev.mode === 'light' ? darkTheme : lightTheme));
  };

  const toggleFont = () => {
    setFont(prev => (prev.mode === 'poppins' ? otherFont : poppinsFont));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, font, toggleFont }}>
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
