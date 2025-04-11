import { StyleSheet } from "react-native";
import Colors from "../base/colors.tsx";
import GlobalStyles from "../base/globalStyles.tsx";

const ButtonStyles = StyleSheet.create({
    mainDiv: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button : {
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 36,
        backgroundColor : Colors.viewFishButton,
    },
    text : {
        color : Colors.textDark,
        fontSize: 20,
        fontFamily: 'BoldFont'
    }
})

export default ButtonStyles;
