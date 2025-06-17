import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { useTheme } from '../../components/organisms/ThemeContext.tsx'; 

const FishCardStyles = () => {
	const { theme, font } = useTheme();

	const styles = useMemo(() => StyleSheet.create({
		doubleCardsContainer: {
			position: "relative",
			padding: 6,
			aspectRatio: 1,
			borderRadius: 24,
			overflow: 'hidden',
		},
		cardContainer: {
			position: "relative",
			aspectRatio: 1,
			borderRadius: 24,
			backgroundColor: theme.navBarBackground,
			overflow: 'hidden',
			zIndex: 1,
		},
		minSizeContainer: {
			position: 'absolute',
			paddingRight: 0,
			alignItems: 'flex-end',
			justifyContent: 'center',
			top: 0,
			right: 0,
			padding: 12,
			zIndex: 1,
			elevation: 1
		},
		// hSize: {
		// 	position: 'relative',
		// 	width: 'auto',
		// 	top: 0,
		// 	right: 10,
		// 	fontSize: 12,
		// 	fontFamily: font.bold,
		// 	color: theme.textBoldLight,
		// 	textShadowColor: 'black',
		// 	textShadowOffset: { width: 1, height: 1 },
		// 	textShadowRadius: 6,
		// 	pointerEvents: 'none'
		// },
		backgroundImage: {
			backgroundColor: theme.navBarBackground,
			width: '100%',
			height: '100%',
			aspectRatio: 1,
			borderRadius: 16,
		},
		cardName: {
			width: "90%",
			alignSelf: 'center',
			position: 'absolute',
			bottom: 0,
			fontFamily: font.bold,
			fontSize: 15,
			textAlign: 'center',
			color: theme.textBoldLight,
			textShadowColor: 'black',
			textShadowOffset: { width: 0.1, height: 0.1 },
			textShadowRadius: 10,
			pointerEvents: 'none',
			lineHeight: 18
		},
		topContainer: {
			top: 40, 
			backgroundColor: '#00000020', 
			width: '100%', 
			height: 60, 
			borderRadius: 12
		},
		topContainerText: 
		{
			textAlign: 'center', 
			top: 2, 
			fontSize: 12,
			fontFamily: font.regular,
			color: theme.textBoldLight,
			textShadowColor: 'black',
			textShadowOffset: { width: 0.1, height: 0.1 },
			textShadowRadius: 10,
			pointerEvents: 'none'
		},
		bottomContainer: {
			bottom: 30, 
			backgroundColor: '#00000020', 
			width: '100%', 
			height: 50, 
			borderRadius: 12
		},
		bottomContainerText: 
		{
			textAlign: 'center', 
			bottom: -33,
			fontSize: 10,
			fontFamily: font.regular,
			color: theme.textBoldLight,
			textShadowColor: 'black',
			textShadowOffset: { width: 0.1, height: 0.1 },
			textShadowRadius: 10,
			pointerEvents: 'none'
		},
	}), [theme, font]);

	return styles;
};

export default FishCardStyles;