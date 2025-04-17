import { StyleSheet } from "react-native";
import { useTheme } from "../../components/organisms/ThemeContext.tsx";
import { useMemo } from "react";

const SingleQuestionStyle = () => {
    const { theme } = useTheme();
  
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
            alignSelf : 'flex-start',
            fontSize : 20,
            color : theme.textDark,
            flexWrap : "wrap"
        },
        highlight : {
            color : theme.highlightBlue,
        }
    }), [theme]);
  
    return styles;
  };
  
  export default SingleQuestionStyle;