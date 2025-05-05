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
			backgroundColor: theme.navBarBackground,
			position: "relative",
			aspectRatio: 1,
			borderRadius: 24,
			overflow: 'hidden',
			shadowColor: '#000',
			shadowOffset: { width: 0, height: 4 },
			shadowOpacity: 0.2,
			shadowRadius: 4,
			elevation: 4
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
	}), [theme, font]);

	return styles;
};

export default FishCardStyles;