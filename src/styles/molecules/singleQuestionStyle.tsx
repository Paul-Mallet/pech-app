import { StyleSheet } from "react-native";
import Colors from "../base/colors.tsx";

const SingleQuestionStyle = StyleSheet.create({
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
        color : Colors.textDark,
        flexWrap : "wrap"
    },
    highlight : {
        color : Colors.highlightBlue,
    }
})

export default SingleQuestionStyle;