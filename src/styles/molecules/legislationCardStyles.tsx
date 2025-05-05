import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "../../components/organisms/ThemeContext.tsx";

const LegislationCardStyles = () => {
	const { theme, font } = useTheme();

	const styles = useMemo(() => StyleSheet.create({
		cardContainer: {
			textAlign: 'left',
			marginBottom: 16,
			padding: 16,
			backgroundColor: theme.cardBackground,
			borderRadius: 24,
			shadowColor: '#000',
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.2,
			shadowRadius: 2,
			elevation: 2,
		},
		titleContainer: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center'
		},
		icon: {
			position: 'absolute',
			top: -4,
			right: 0,
		},
		title: {
			width: '90%',
			fontFamily: font.bold,
			textAlign: 'left',
			fontSize: 16,
			color: theme.textDark,
			marginBottom: 8,
			lineHeight: 20
		},
		text: {
			fontFamily: font.regular,
			fontSize: 12,
			color: theme.textDark,
			textAlign: 'left',
		},
	}), [theme, font]);

	return styles;
};

export default LegislationCardStyles;