import { StyleSheet } from "react-native";
import Colors from "../base/colors.tsx";

const QuestionStyles = StyleSheet.create({
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
		backgroundColor: Colors.searchBarBackground,
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
        borderColor : Colors.textDark,
        borderWidth : 1,
        height : 1,
        width : '88%',
        opacity : 0.3,
        borderRadius : 25
    }

}); 

export default QuestionStyles;