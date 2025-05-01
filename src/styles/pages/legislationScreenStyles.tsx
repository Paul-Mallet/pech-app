import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '../../components/organisms/ThemeContext.tsx';

const LegislationScreenStyles = () => {
  	const { theme } = useTheme();

  	const styles = useMemo(() => StyleSheet.create({
		scrollView: {
			display: "flex",
			flexDirection: "column",
			paddingTop: 10,
			paddingLeft: 8,
			paddingRight: 8,
			paddingBottom: 0,
			marginBottom: 60,
			marginTop: 100,
		},
  	}), [theme]);

  	return styles;
};

export default LegislationScreenStyles;
