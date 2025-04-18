import { StyleSheet } from "react-native";
import { useTheme } from "../../components/organisms/ThemeContext.tsx";
import { useMemo } from "react";

const SingleQuestionStyle = () => {
    const { theme, font } = useTheme();
  
    const styles = useMemo(() => StyleSheet.create({
        mainDiv : {
            paddingVertical : 20,
            alignItems : 'center',
        },
        container : {
            width : '90%',
            flexDirection: 'row',
            justifyContent : 'space-between',
            alignItems : 'center'
        },
        text : {
            fontFamily: font.regular,
            alignSelf : 'flex-start',
            fontSize : 16,
            color : theme.textDark,
            flexWrap : "wrap"
        },
        highlight : {
            fontSize : 16,
            fontFamily: font.bold,
            color : theme.textHighlightDark,
        }
    }), [theme]);
  
    return styles;
  };
  
  export default SingleQuestionStyle;