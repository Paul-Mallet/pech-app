import { StyleSheet } from "react-native";
import { useMemo } from "react";
import { useTheme } from "../../components/organisms/ThemeContext.tsx";


const QuestionStyles = () => {
    const { theme } = useTheme();
  
    const styles = useMemo(() => StyleSheet.create({
        mainDiv : {
            width: '100%',
            height: '100%',
            justifyContent: 'flex-start',
            alignItems : 'center',
        },
        questionsList: 
        {
            top: 80,
            width: '95%',
            height: '65%',
        },
        questionDiv : {
            width: '95%',
            margin: 4,
            padding: 2,
            borderRadius: 24,
            backgroundColor: theme.searchBarBackground,
            gap: 6,
            shadowColor: '#000',
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 2,
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