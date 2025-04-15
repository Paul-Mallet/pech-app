import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../components/organisms/ThemeContext.tsx';

export const LoadPreferences: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setThemeByName, setSelectedTheme, setFontByName, setSelectedFont } = useTheme();
  const [isReady, setIsReady] = useState(false);

  // used to remove the (not true) errors
  const safeAsyncStorage = AsyncStorage as unknown as {
    getItem: (key: string) => Promise<string | null>;
    setItem: (key: string, value: string) => Promise<void>;
  };

  useEffect(() => {
    const loadPreferences = async () => {
      const savedTheme = await safeAsyncStorage.getItem('theme');
      if (savedTheme)
        {
          setThemeByName(savedTheme);
          setSelectedTheme(savedTheme);
        } 

      const savedFont = await safeAsyncStorage.getItem('font');
      if (savedFont)
        {
          setFontByName(savedFont);
          setSelectedFont(savedFont);
        } 

      setIsReady(true);
    };

    loadPreferences();
  }, []);

  if (!isReady) return null; // or splash screen

  return children;
};

export default LoadPreferences;
