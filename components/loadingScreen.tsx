// SplashScreen.js
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, Text, Image } from 'react-native';

const SplashScreen = ({ fadeAnim, translateYAnim, onAnimationEnd } : {fadeAnim : any, onAnimationEnd : any, translateYAnim : any}) => {
    useEffect(() => {
      // Start fade-out and move-up animation after 2 seconds
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 0, // Fade out
            duration: 1000, // Duration of fade-out
            useNativeDriver: true,
          }),
          Animated.timing(translateYAnim, {
            toValue: 1000, // Move up by 1000 units, bottomBarHeight
            duration: 750, // Duration of move-up
            useNativeDriver: true,
          }),
        ]).start(() => {
          // After the animation completes, trigger the callback to switch screens
          onAnimationEnd();
        });
      }, 1000); // Delay before the animation starts
    }, [fadeAnim, translateYAnim]);
  
    return (
      <Animated.View
        style={[
          styles.container,
          { opacity: fadeAnim, transform: [{ translateY: translateYAnim }] }, // Apply fade and move-up effect
        ]}
      >
        <Image source={require('../assets/Logo.webp')} style={styles.image} />
        <Text style={styles.text}>Pêch’App</Text>
      </Animated.View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#31909C',
    position: 'absolute', // Make it appear in front of everything
    width: '100%',
    height: '100%',
    zIndex: 10, // Ensure it stays on top of everything else
  },
  image: {
    width: 256,
    height: 99,
  },
  text: {
    color: '#F6F4EB',
    fontSize: 32,
    fontFamily: 'BoldFont',
    marginTop: 20,
  },
});

export default SplashScreen;
