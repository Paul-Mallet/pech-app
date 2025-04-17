import { StyleSheet } from "react-native";
import { useMemo } from "react";
import { useTheme } from "../../components/organisms/ThemeContext.tsx";


const QuestionStyles = () => {
    const { theme } = useTheme();
  
    const styles = useMemo(() => StyleSheet.create({
        mainDiv : {
            paddingVertical : 50,
            justifyContent: 'center',
            alignItems : 'center',
        },
        questionDiv : {
            flexShrink: 1,
            maxHeight : 450,
            width: '70%',
            overflow : 'scroll',
            borderRadius: 32,
            backgroundColor: theme.searchBarBackground,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.2,
            shadowRadius: 10,
            elevation: 10,
        },
        scrollContent : {
            flexGrow : 1,
        },
        line : {
            alignSelf : 'center',
            borderColor : theme.textDark,
            borderWidth : 1,
            height : 1,
            width : '88%',
            opacity : 0.3,
            borderRadius : 25
        }
    }), [theme]);
  
    return styles;
  };
  
export default QuestionStyles;