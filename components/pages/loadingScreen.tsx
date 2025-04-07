// SplashScreen.js
import React, { useEffect } from 'react';
import { Animated,
	Easing,
	StyleSheet,
	Text,
	Image,
	useWindowDimensions } from 'react-native';

const SplashScreen = ({ fadeAnim, translateYAnim, onAnimationEnd } : {fadeAnim : any, onAnimationEnd : any, translateYAnim : any}) => {
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
	position: 'absolute',
	width: '100%',
	height: '100%',
	zIndex: 10,
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
