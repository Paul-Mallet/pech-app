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
			padding: 6,
			aspectRatio: 1,
			borderRadius: 24,
			overflow: 'hidden',
		},
		backgroundImage: {
			width: '100%',
			resizeMode: 'cover',
			alignSelf: 'center',
			aspectRatio: 1,
			borderRadius: 16,
			backgroundColor: theme.navBarBackground,
			shadowColor: '#000',
			shadowOffset: { width: 0, height: 5 },
			shadowOpacity: 0.2,
			shadowRadius: 5,
			elevation: 5
		},
		cardName: {
			position: 'absolute',
			alignSelf: 'center',
			bottom: 5,
			width: "90%",
			fontFamily: font.bold,
			fontSize: 16,
			textAlign: 'center',
			color: theme.textBoldLight,
			textShadowColor: 'black',
			textShadowOffset: { width: 1, height: 1 },
			textShadowRadius: 6,
			pointerEvents: 'none'
		},
	}), [theme, font]);

	return styles;
};

export default FishCardStyles;