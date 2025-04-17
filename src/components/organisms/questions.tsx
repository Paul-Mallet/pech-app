import React, { useState } from "react";
import { View , Text, ScrollView} from "react-native";
import QuestionStyles from "../../styles/organisms/questionStyles.tsx";
import SingleQuestion from "../molecules/singleQuestion.tsx";
import { useAnswers } from "../../@config/answerContext.tsx";

const Questions = ({navigation} : {navigation : any}) => {
    const {answers, setAnswers } = useAnswers();

    return (
        <>
            <View style={QuestionStyles.mainDiv}>
                <ScrollView style={QuestionStyles.questionDiv} contentContainerStyle={QuestionStyles.scrollContent}>
                    <SingleQuestion text={"Quelle est la teinte ?"} navigation={navigation}/>
                    <Text style={QuestionStyles.line}></Text>
                    <SingleQuestion text={"Forme des nageoires ?"} field="fin" navigation={navigation}/>
                    <Text style={QuestionStyles.line}></Text>
                    <SingleQuestion text={"Forme de la tête ?"} navigation={navigation}/>
                    <Text style={QuestionStyles.line}></Text>
                    <SingleQuestion text={"Forme des branchies ?"} navigation={navigation}/>
                    <Text style={QuestionStyles.line}></Text>
                    <SingleQuestion text={"A t-il des dents ?"} navigation={navigation}/>
                    <Text style={QuestionStyles.line}></Text>
                    <SingleQuestion text={"Forme du corps ?"} navigation={navigation}/>
                </ScrollView>
            </View>
        </>
    )

}

export default Questions