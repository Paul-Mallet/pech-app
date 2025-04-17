import { StyleSheet } from "react-native";
import { lightTheme } from "../base/Themes.tsx"; 

const ButtonStyles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    padding: 16,
    borderRadius: 48,
    backgroundColor: lightTheme.btnBottomSheetBackground,
  },
  text: {
    fontSize: 16,
    fontWeight: 700,
    color: lightTheme.textDark,
  },
});

export default ButtonStyles