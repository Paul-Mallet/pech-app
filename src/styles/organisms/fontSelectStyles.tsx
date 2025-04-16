import { StyleSheet } from "react-native";
import { useTheme } from "../../components/organisms/ThemeContext.tsx";
import { useMemo } from "react";

const FontSelectStyles = () => {
  const { theme } = useTheme();

  const styles = useMemo(() => StyleSheet.create({
    img: {
      backgroundColor: theme.body,
      borderColor: theme.textHighlightDark,
      borderWidth: 2,
      borderRadius: 8,
      width: 140,
      height: 150,
    },
    container: {
      justifyContent: 'space-around',
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
  }), [theme]);

  return styles;
};

export default FontSelectStyles;