import { StyleSheet } from "react-native";
import { useTheme } from "../base/ThemeContext.tsx";

const LoadingScreenStyles = () => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.textHighlightDark,
      position: 'absolute',
      width: '100%',
      height: '100%',
      zIndex: 10,
    },
    image: {
      width: 256,
      height: 99,
    },
    text: {
      color: theme.body,
      fontSize: 32,
      fontFamily: 'BoldFont',
      marginTop: 20,
    },
  });
  return styles;
};

export default LoadingScreenStyles;