import { StyleSheet } from "react-native";
import GlobalStyles from "../base/globalStyles.tsx";
import { useTheme } from "../../components/organisms/ThemeContext.tsx";
import { useMemo } from "react";

const ButtonStyles = () => {
    const { theme } = useTheme();
  
    const styles = useMemo(() => StyleSheet.create({
        mainDiv: {
            flex: 0.5,
            justifyContent: 'center',
            alignItems: 'center',
        },
        button : {
            paddingVertical: 15,
            paddingHorizontal: 40,
            borderRadius: 36,
            backgroundColor : theme.viewFishButton,
        },
        text : {
            color : theme.textDark,
            fontSize: 20,
            fontFamily: 'BoldFont'
        }
    }), [theme]);
  
    return styles;
  };
  
export default ButtonStyles;
