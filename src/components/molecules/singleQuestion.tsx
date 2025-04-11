import React from "react";
import { View, Text, Pressable } from 'react-native'
import SingleQuestionStyle from "../../styles/molecules/singleQuestionStyle.tsx";
import ArrowHead from "../atoms/arrowHead.tsx";

const SingleQuestion = ({text, navigation} : {text : string; navigation : any}) => {

    let textToDisplay : string[] = text.split(' ');
    const lastWordIndex = textToDisplay.length - 2;
    const beforeLastWord = textToDisplay.slice(0, lastWordIndex).join(' ');
    const lastWord = textToDisplay[lastWordIndex] || '';
    const questionMark = textToDisplay[textToDisplay.length - 1];

    return (
        <Pressable style={SingleQuestionStyle.mainDiv} onPress={() => {alert(text)}}>
            <View style={SingleQuestionStyle.container}>
                <Text style={SingleQuestionStyle.text}>
                    {beforeLastWord} <Text style={SingleQuestionStyle.highlight}>{lastWord}</Text> {questionMark}
                </Text>
                <ArrowHead />
            </View>
        </Pressable>
    )
}

export default SingleQuestion;