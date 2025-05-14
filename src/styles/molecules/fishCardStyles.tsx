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
		hSize: {
			position: 'relative',
			width: 'auto',
			top: 0,
			right: 10,
			fontSize: 12,
			fontFamily: font.bold,
			color: theme.textBoldLight,
			textShadowColor: 'black',
			textShadowOffset: { width: 1, height: 1 },
			textShadowRadius: 6,
			pointerEvents: 'none'
		},
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
			bottom: 5,
			fontFamily: font.bold,
			fontSize: 16,
			textAlign: 'center',
			color: theme.textBoldLight,
			textShadowColor: 'black',
			textShadowOffset: { width: 1, height: 1 },
			textShadowRadius: 6,
			pointerEvents: 'none',
			lineHeight: 20
		},
		topContainer: {
			top: -20, 
			backgroundColor: '#00000020', 
			width: '100%', 
			height: 60, 
			borderRadius: 12
		},
		topContainerText: 
		{
			textAlign: 'center', 
			top: -42, 
			zIndex: 1,
			fontSize: 10,
			fontFamily: font.bold,
			color: theme.textBoldLight,
			textShadowColor: 'black',
			textShadowOffset: { width: 0.8, height: 0.8 },
			textShadowRadius: 4,
			pointerEvents: 'none'
		},
		bottomContainer: {
			position: 'absolute', 
			bottom: -20, 
			backgroundColor: '#00000020', 
			width: '100%', 
			height: 60, 
			borderRadius: 12
		},
		bottomContainerText: 
		{
			textAlign: 'center', 
			bottom: -42, 
			zIndex: 1,
			fontSize: 10,
			fontFamily: font.bold,
			color: theme.textBoldLight,
			textShadowColor: 'black',
			textShadowOffset: { width: 0.8, height: 0.8 },
			textShadowRadius: 4,
			pointerEvents: 'none'
		},
	}), [theme, font]);

	return styles;
};

export default FishCardStyles;