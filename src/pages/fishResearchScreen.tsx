import React, { useState } from "react"
import Colors from "../styles/base/colors.tsx";
import { Button, View , Text, Pressable} from "react-native"
import ButtonStyles from "../styles/atoms/buttonStyles.tsx"
import { Ionicons } from '@expo/vector-icons';
import Questions from "../components/organisms/questions.tsx";
import ViewFishButton from "../components/atoms/viewFishButton.tsx";
import FishResearchStyle from "../styles/pages/fishResearchScreenStyles.tsx";
import { AnswerProvider } from "../@config/answerContext.tsx";

const FishResearch = ({navigation} : any) => {
    return (
        <>
            <AnswerProvider>
                <View style={FishResearchStyle.mainDiv}>
                    <Pressable style={ButtonStyles.searchButton} onPress={() => navigation.goBack()}>
                        <Ionicons name='close-circle' size={70} color={Colors.roundButton}/>
                    </Pressable>
                    <Questions navigation={navigation}/>
                    <ViewFishButton/>
                </View>
            </AnswerProvider>
        </>
    )
}

export default FishResearch