import { StyleSheet } from "react-native";
import { useTheme } from '../../components/organisms/ThemeContext.tsx'; 
import { useMemo } from "react";

const ButtonStyles = () => {
  const { theme, font } = useTheme();

  const styles = useMemo(() => StyleSheet.create({
    containerCTAButton: {
      width: '100%',
      alignItems: 'center',
      padding: 16,
      borderRadius: 48,
      backgroundColor: theme.btnBottomSheetBackground,
      maxHeight: 60
    },
    textCTAButton: {
      fontSize: 16,
      fontFamily: font.bold,
      color: theme.textDark,
    },
    closeSearchButton: {
      alignSelf: 'center',
      top: 50,
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme.textHighlightDark,
      backgroundColor: theme.body,
      borderRadius: "50%",
      padding: 4,
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 1 },
      shadowRadius: 5,
      shadowOpacity: 0.25,
      elevation: 5,
    }
  }), [theme]);

  return styles;
};

export default ButtonStyles;