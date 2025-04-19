import React, { useState, useRef } from 'react';
import { Animated, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './pages/loadingScreen.tsx';
import MainNavigator from './pages/mainNavigator.tsx';
import { ThemeProvider } from './components/organisms/ThemeContext.tsx';
import useLoadFonts from './components/organisms/loadFonts.tsx';
import LoadPreferences from './styles/organisms/loadSaveManager.tsx';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { HistoryProvider } from './components/organisms/HistoryContext.tsx';
import { ReducedMotionConfig, ReduceMotion } from 'react-native-reanimated';

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
    <GestureHandlerRootView>
      <ThemeProvider>
        <HistoryProvider>
          <LoadPreferences>
            <View style={{ flex: 1 }}>
              <SplashScreen
                fadeAnim={fadeAnim}
                translateYAnim={translateYAnim}
                onAnimationEnd={handleAnimationEnd}
              />
              <NavigationContainer>
                <ReducedMotionConfig mode={ReduceMotion.Never} />
                <MainNavigator />
              </NavigationContainer>
            </View>
          </LoadPreferences>
        </HistoryProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}