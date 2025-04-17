import { StyleSheet } from "react-native";
import GlobalStyles from "../base/globalStyles.tsx";
import { useTheme } from "../../components/organisms/ThemeContext.tsx";
import { useMemo } from "react";

const ButtonStyles = () => {
    const { theme } = useTheme();
  
    const styles = useMemo(() => StyleSheet.create({
        mainDiv: {
            position: 'absolute',
            bottom: 70,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
        },
        button : {
            height: 40,
            paddingHorizontal: 40,
            borderRadius: 24,
            borderWidth: 2,
            borderColor: theme.iconColor,
            textAlign: 'center',
            backgroundColor : theme.navBarBackground,
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
