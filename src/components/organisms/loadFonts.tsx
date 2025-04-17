// utils/useLoadFonts.ts
import { useEffect, useState } from 'react';
import * as Font from 'expo-font';

export default function useLoadFonts() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'PoppinsBold': require('../../../assets/fonts/Poppins-Bold.ttf'),
        'PoppinsRegular': require('../../../assets/fonts/Poppins-Regular.ttf'),
        'PoppinsLightItalic': require('../../../assets/fonts/Poppins-LightItalic.ttf'),
        'DyslexicBold': require('../../../assets/fonts/OpenDyslexic-Bold.ttf'),
        'DyslexicRegular': require('../../../assets/fonts/OpenDyslexic-Regular.ttf'),
        // 'DyslexiaItalic': require('../../../assets/fonts/OpenDyslexic-Italic.ttf'),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return fontsLoaded;
}
