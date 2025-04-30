import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { useTheme } from '../../components/organisms/ThemeContext.tsx';

const LegislationStyles = () => {
  	const { theme } = useTheme();

  	const styles = useMemo(() => StyleSheet.create({
		legislationPanel: {
			display: "flex",
			flexDirection: "column",
			paddingTop: 10,
			paddingLeft: 8,
			paddingRight: 8,
			paddingBottom: 0,
			marginBottom: 60,
			marginTop: 100,
		},
		legislationParagraph: {
			position: "relative",
			width: '100%',
			padding: 8,
			borderRadius: 8,
			// overflow: 'hidden',
			shadowColor: '#00000010',
			shadowOffset: { width: 0, height: 3 },
			shadowOpacity: 0.2,
			shadowRadius: 3,
			elevation: 3,
		},
  	}), [theme]);

  	return styles;
};

export default LegislationStyles;
