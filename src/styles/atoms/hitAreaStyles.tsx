import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { useTheme } from '../../components/organisms/ThemeContext.tsx'; 

const HitAreaStyles = () => {
	const { theme } = useTheme();

	const styles = useMemo(() => StyleSheet.create({
		hitContainer: {
			paddingVertical: 20,
			paddingHorizontal: '30%',
			justifyContent: 'center',
		},
		hitBar: {
			width: 40,
			height: 5,
			borderRadius: 4,
			backgroundColor: theme.textDark,
			opacity: 0.7,
			alignSelf: 'center',
		}
	}), [theme]);

	return styles;
};

export default HitAreaStyles;