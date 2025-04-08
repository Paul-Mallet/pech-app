import React, { useEffect, useState, useRef } from 'react';
import { Animated, Text, StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import BottomTabNavigator from './components/organisms/navbar.tsx';
import SplashScreen from './pages/loadingScreen.tsx';
import Colors from './styles/base/colors.tsx';

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [showMainContent, setShowMainContent] = useState(false); // State to control content display
  const fadeAnim = useRef(new Animated.Value(1)).current; // Opacity starting at 1
  const translateYAnim = useRef(new Animated.Value(0)).current; // Starting position

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'tomato', // useless?
      background: Colors.backgroundLight,
    },
  };

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'BoldFont': require('../assets/fonts/Poppins-Bold.ttf'),
        'RegularFont': require('../assets/fonts/Poppins-Regular.ttf'),
      });
      setFontLoaded(true);
    }
    loadFonts();
  }, []);

  const handleAnimationEnd = () => {
    setShowMainContent(true);
  };

  if (!fontLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
        <SplashScreen
          fadeAnim={fadeAnim}
          translateYAnim={translateYAnim}
          onAnimationEnd={handleAnimationEnd}
        />
        <NavigationContainer theme={MyTheme}>
          <BottomTabNavigator />
        </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLight,
  },
});