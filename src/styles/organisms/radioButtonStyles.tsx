import { StyleSheet } from "react-native";
import { useTheme } from "../base/ThemeContext.tsx";

const RadioButtonStyles = () => {
  const { theme, font } = useTheme();

  const styles = StyleSheet.create({
    img: {
        borderColor: theme.textHighlightDark,
        padding: 10,
        borderWidth: 2,
        borderRadius: 8,
        width: 100,
        height: 150,
    },
    container: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        textAlign: 'center',
    },
    radioButton: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 15,
    },
    radioCircle: {
        marginTop: 10,
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: theme.textHighlightDark,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedOption: {
        borderColor: theme.green,
		shadowColor: theme.green,
		shadowOffset: { width: 10, height: 10 },
		shadowOpacity: 1,
		shadowRadius: 10,
		elevation: 10,
    },
    selectedRb: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: theme.green,
    },
    radioText: {
        fontSize: 16,
    },
  });
  return styles;
};

export default RadioButtonStyles;