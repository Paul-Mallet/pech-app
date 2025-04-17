import { StyleSheet } from "react-native";
import { useMemo } from "react";
import { useTheme } from "../../components/organisms/ThemeContext.tsx";


const QuestionStyles = () => {
    const { theme } = useTheme();
  
    const styles = useMemo(() => StyleSheet.create({
        mainDiv : {
            flex: 1,
            justifyContent: 'center',
            alignItems : 'center',
        },
        questionDiv : {
            flexShrink: 1,
            maxHeight : 450,
            width: '80%',
            borderRadius: 24,
            backgroundColor: theme.searchBarBackground,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.2,
            shadowRadius: 10,
            elevation: 10,
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