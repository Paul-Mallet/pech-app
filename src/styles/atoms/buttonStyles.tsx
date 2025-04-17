import { StyleSheet } from "react-native";
import { useTheme } from '../../components/organisms/ThemeContext.tsx'; 

const { theme, font } = useTheme();

const ButtonStyles = StyleSheet.create({
  containerCTAButton: {
    width: '100%',
    alignItems: 'center',
    padding: 16,
    borderRadius: 48,
    backgroundColor: lightTheme.btnBottomSheetBackground,
  },
  textCTAButton: {
    fontSize: 16,
    fontFamily: font.bold,
    color: font.textDark,
  },
});

export default ButtonStyles