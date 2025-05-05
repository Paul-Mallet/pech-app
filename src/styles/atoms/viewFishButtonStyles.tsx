import { StyleSheet } from "react-native";
import { useTheme } from "../../components/organisms/ThemeContext.tsx";
import { useMemo } from "react";

const ButtonStyles = () => {
    const { theme, font } = useTheme();
  
    const styles = useMemo(() => StyleSheet.create({
        // mainDiv: {
        //     position: 'absolute',
        //     bottom: 70,
        //     alignSelf: 'center',
        //     justifyContent: 'center',
        //     alignItems: 'center',
        // },
        button : {
            justifyContent: 'center',
            height: 40,
            paddingHorizontal: 40,
            borderRadius: 24,
            borderWidth: 2,
            borderColor: theme.textHighlightDark,
            backgroundColor : theme.navBarBackground,
        },
        text : {
            fontFamily: font.regular,
            color : theme.textDark,
            fontSize: 16,
        }
    }), [theme]);
  
    return styles;
  };
  
export default ButtonStyles;
