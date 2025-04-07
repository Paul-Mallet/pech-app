import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, Text, Image } from 'react-native';
import LoadingScreenStyles from '../styles/pages/LoadingScreenStyles';

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
          LoadingScreenStyles.container,
          { opacity: fadeAnim, transform: [{ translateY: translateYAnim }] }, // Apply fade and move-up effect
        ]}
      >
        <Image source={require('../../assets/Logo.webp')} style={LoadingScreenStyles.image} />
        <Text style={LoadingScreenStyles.text}>Pêch’App</Text>
      </Animated.View>
    );
  };


export default SplashScreen;
