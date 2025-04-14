import React, { useEffect, useState, useRef } from 'react';
import { Animated, Text, StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
// import BottomTabNavigator from './components/organisms/navbar.tsx';
import SplashScreen from './pages/loadingScreen.tsx';
import Colors from './styles/base/colors.tsx';
import MainNavigator from './pages/mainNavigator.tsx';
import { ThemeProvider } from './components/organisms/ThemeContext.tsx';
import useLoadFonts from './components/organisms/loadFonts.tsx';
import LoadPreferences from './styles/organisms/loadSaveManager.tsx';

export default function App() {
  const fontLoaded = useLoadFonts();
  const [showMainContent, setShowMainContent] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const translateYAnim = useRef(new Animated.Value(0)).current;


  const handleAnimationEnd = () => {
    setShowMainContent(true);
  };

  if (!fontLoaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <LoadPreferences>
        <View style={{ flex: 1 }}>
          <SplashScreen
            fadeAnim={fadeAnim}
            translateYAnim={translateYAnim}
            onAnimationEnd={handleAnimationEnd}
          />
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>
        </View>
      </LoadPreferences>
    </ThemeProvider>
  );
}