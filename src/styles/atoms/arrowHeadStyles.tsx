import { useMemo } from "react";
import { useTheme } from '../../components/organisms/ThemeContext.tsx'; 

const ArrowHeadStyles = () => {
	const { theme } = useTheme();

	const styles = useMemo(() => ({
		color: theme.textDark,
		size: 20
	}), [theme]);

	return styles;
};

export default ArrowHeadStyles;