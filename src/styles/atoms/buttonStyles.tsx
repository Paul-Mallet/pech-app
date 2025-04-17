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
    },
    textCTAButton: {
      fontSize: 16,
      fontFamily: font.bold,
      color: theme.textDark,
    },
    searchButton: {
      alignItems: 'center',
      justifyContent: 'flex-end',
      flex: 0.5,
    }
  }), [theme]);

  return styles;
};

export default ButtonStyles;