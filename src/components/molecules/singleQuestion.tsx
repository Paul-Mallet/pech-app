import React from "react";
import { View, Text, Pressable } from 'react-native'
import SingleQuestionStyle from "../../styles/molecules/singleQuestionStyle.tsx";
import ArrowHead from "../atoms/arrowHead.tsx";
import { useAnswers } from "../../@config/answerContext.tsx";

type SingleQuestionProps = {
    text: string;
    field?: "fin"; // | "" to expand as needed
    navigation: any;
};

const SingleQuestion : React.FC<SingleQuestionProps> = ({text, field, navigation}) => {
    const styles = SingleQuestionStyle();
    const {answers, setAnswers} = useAnswers();

    let textToDisplay : string[] = text.split(' ');
    const lastWordIndex = textToDisplay.length - 2;
    const beforeLastWord = textToDisplay.slice(0, lastWordIndex).join(' ');
    const lastWord = textToDisplay[lastWordIndex] || '';
    const questionMark = textToDisplay[textToDisplay.length - 1];

    // a la place du alert, envoyer vers la page du choix, et lui donner le field a remplir

    /*

        dans la page ou on fait le choix, pour set la reponse, on peut faire :

        const handlePress = () => {
            setAnswer({ [field] = "reponse" })
        }

        et comme ca, ca update
    */

    return (
        <Pressable style={styles.mainDiv} onPress={() => {alert(text)}}>
            <View style={styles.container}>
                <Text style={styles.text}>
                    {beforeLastWord} <Text style={styles.highlight}>{lastWord}</Text> {questionMark}
                </Text>
                <ArrowHead />
            </View>
        </Pressable>
    )
}

export default SingleQuestion;