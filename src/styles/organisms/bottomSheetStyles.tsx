import { StyleSheet } from "react-native";
import { useTheme } from "../../components/organisms/ThemeContext.tsx";
import { useMemo } from "react";

const BottomSheetStyles = () => {
  const { theme } = useTheme();

  const styles = useMemo(() => StyleSheet.create({
	sliderContainer: {
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		height: 'auto'
	},
	flatList: {
		position: 'relative',
		width: '100%'
	},
	imageContainer: {
		width: '100%'
	},
	image: {
		resizeMode: 'cover',
		borderRadius: 24
	},
	pagination: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 10,
	},
	dot: {
		width: 12,
		height: 12,
		borderRadius: 12,
		backgroundColor: theme.textDark,
		opacity: 0.4,
		marginHorizontal: 4,
	},
	activeDot: {
		width: 12,
		height: 12,
		backgroundColor: theme.textHighlightDark,
		opacity: 1,
	},
	imageSliderButton: 
	{
		transform: [{ translateY: -30 }],
		position: 'absolute',
		top: '50%',
		left: -32,
		justifyContent: 'center',
		alignItems: 'center',
	},
  }), [theme]);

  return styles;
};

export default BottomSheetStyles;