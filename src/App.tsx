import React, { useEffect, useState, useRef } from 'react';
import { Animated, Text, StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
// import BottomTabNavigator from './components/organisms/navbar.tsx';
import SplashScreen from './pages/loadingScreen.tsx';
import Colors from './styles/base/colors.tsx';
import MainNavigator from './pages/mainNavigator.tsx';
import { ThemeProvider } from './styles/base/ThemeContext.tsx';

export default function App() {
  const [showMainContent, setShowMainContent] = useState(false); // State to control content display
  const fadeAnim = useRef(new Animated.Value(1)).current; // Opacity starting at 1
  const translateYAnim = useRef(new Animated.Value(0)).current; // Starting position

  const handleAnimationEnd = () => {
    setShowMainContent(true);
  };

  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
}