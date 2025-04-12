import React, { useEffect } from 'react';
import { Animated,
	Easing,
	Text,
	Image,
	useWindowDimensions } from 'react-native';
import LoadingScreenStyles from '../styles/pages/LoadingScreenStyles.tsx';

const SplashScreen = ({ fadeAnim, translateYAnim, onAnimationEnd } : {fadeAnim : any, onAnimationEnd : any, translateYAnim : any}) => {
	const styles = LoadingScreenStyles();
	const { height: windowHeight, width, scale, fontScale } = useWindowDimensions();
	const bottomBarHeight = 60;

	useEffect(() => {
	  setTimeout(() => {
		Animated.parallel([
		  Animated.timing(translateYAnim, {
			toValue: windowHeight + bottomBarHeight,
			duration: 1800,
			easing: Easing.bezier(0.8, 0, 0.2, 1),
			useNativeDriver: true,
		  }),
		]).start(() => {
			onAnimationEnd();
	  	});
	  }, 1500);
	}, [fadeAnim, translateYAnim, windowHeight]);
  
    return (
      <Animated.View
        style={[
			styles.container,
          { opacity: fadeAnim, transform: [{ translateY: translateYAnim }] }, // Apply fade and move-up effect
        ]}
      >
        <Image source={require('../../assets/Logo.webp')} style={styles.image} />
        <Text style={styles.pechAppTitle}>Pêch’App</Text>
      </Animated.View>
    );
  };


export default SplashScreen;
