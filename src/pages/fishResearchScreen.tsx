import React, { useState } from "react"
import { Button, View , Text, TouchableOpacity} from "react-native"
import ButtonStyles from "../styles/atoms/buttonStyles.tsx"
import { Ionicons } from '@expo/vector-icons';
import Questions from "../components/organisms/questions.tsx";
import ViewFishButton from "../components/atoms/viewFishButton.tsx";
import FishResearchStyle from "../styles/pages/fishResearchScreenStyles.tsx";
import { AnswerProvider } from "../@config/answerContext.tsx";
import { useTheme } from "../components/organisms/ThemeContext.tsx";
import { FishListProvider } from "../@config/fishListContext.tsx";
import BodyTypeModel from "../models/bodyType.model.tsx";
import FinModel from "../models/fins.model.tsx";
import EyeModel from "../models/eye.model.tsx";
import { getAllBodyType, getAllEyes, getAllFins } from "../services/fish.service.tsx";
import QuestionModel from "../models/questions.model.tsx";
import QuestionsFactory from "../@utils/questions.factory.tsx";

const FishResearch = async ({navigation} : any) => {
    const buttonStyles = ButtonStyles();
    const styles = FishResearchStyle();
	const { theme } = useTheme();

    // const bodyTypes : BodyTypeModel[] = await getAllBodyType();
    // const fins : FinModel[] = await getAllFins();
    // const eyes : EyeModel[] = await getAllEyes();

    // const questionsParams : QuestionModel = QuestionsFactory.RequestToModel(bodyTypes, fins, eyes);

    return (
        <FishListProvider>
            <AnswerProvider>
                <View style={styles.mainDiv}>
                    <TouchableOpacity style={buttonStyles.closeSearchButton} onPress={() => navigation.goBack()}>
                        <Ionicons name='close' size={24} color={theme.iconColor}/>
                    </TouchableOpacity>
                    <Questions navigation={navigation}/>
                    <ViewFishButton/>
                </View>
            </AnswerProvider>
        </FishListProvider>
    )
}

export default FishResearch