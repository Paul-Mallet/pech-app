import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { useTheme } from '../../components/organisms/ThemeContext.tsx'; 

const FishAIScreenStyles = () => {
	const { theme, font } = useTheme();

	const styles = useMemo(() => StyleSheet.create({
		container: {
		  flex: 1,
		  justifyContent: 'center',
		},
		message: {
		  textAlign: 'center',
		  paddingBottom: 10,
		},
		camera: {
		  flex: 1,
		},
		buttonContainer: {
		  flex: 1,
		  flexDirection: 'row',
		  backgroundColor: 'transparent',
		  justifyContent: 'center',
		  bottom: 80,
		},
		button: {
		  justifyContent: 'center',
		  alignItems: 'center',
		  borderRadius: '50%',
		  width: 64,
		  height: 64,
		  backgroundColor: theme.textHighlightDark
		},
		text: {
		  fontSize: 24,
		  fontWeight: 'bold',
		  color: 'white',
		},
		takePictureButton: 
		{
			justifyContent: 'center', 
			alignItems: 'center', 
			alignSelf: 'flex-end', 
			borderRadius: '50%', 
			backgroundColor: 'transparent', 
			borderWidth: 3, 
			borderColor: theme.textHighlightDark, 
			width: 80, 
			height: 80
		},
		closeSearchButton: {
		  alignSelf: 'flex-end',
		  top: 50,
		  right: 10,
		  width: 40,
		  height: 40,
		  alignItems: 'center',
		  justifyContent: 'center',
		  backgroundColor: theme.textHighlightDark,
		  borderColor: theme.textHighlightDark,
		  borderWidth: 1,
		  borderRadius: "50%",
		  padding: 4,
		  shadowColor: '#000',
		  shadowOffset: { width: 1, height: 1 },
		  shadowRadius: 5,
		  shadowOpacity: 0.25,
		  elevation: 5,
		},
		buttonClose: {
		  justifyContent: 'center', 
		  height: 40, 
		  paddingHorizontal: 20, 
		  borderRadius: 12, 
		  borderWidth: 2, 
		  borderColor: theme.red, 
		  backgroundColor : theme.redBg
		},
		buttonSend: {
		  justifyContent: 'center', 
		  height: 40,
		  paddingHorizontal: 20, 
		  borderRadius: 12, 
		  borderWidth: 2, 
		  borderColor: theme.textHighlightDark, 
		  backgroundColor : theme.navBarBackground
		},
		buttonText: {
		  fontFamily: font.regular, 
		  color : theme.textDark, 
		  fontSize: 16
		},
	}), [theme, font]);

	return styles;
};

export default FishAIScreenStyles;