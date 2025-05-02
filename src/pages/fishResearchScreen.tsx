import React, { useEffect, useState } from "react"
import { Button, View , Text, TouchableOpacity, ActivityIndicator} from "react-native"
import ButtonStyles from "../styles/atoms/buttonStyles.tsx"
import { Ionicons } from '@expo/vector-icons';
import Questions from "../components/organisms/questions.tsx";
import ViewFishButton from "../components/atoms/viewFishButton.tsx";
import FishResearchStyle from "../styles/pages/fishResearchScreenStyles.tsx";
import { AnswerProvider } from "../@config/answerContext.tsx";
import { useTheme } from "../components/organisms/ThemeContext.tsx";
import { FishListProvider } from "../@config/fishListContext.tsx";
import { getAllBodyType, getAllEyes, getAllFins } from "../services/fish.service.tsx";
import { BodyTypeModel, FinModel, EyeModel } from "../models/fish.model.tsx";
import QuestionModel from "../models/questions.model.tsx";
import QuestionsFactory from "../@utils/questions.factory.tsx";

const FishResearch = ({navigation} : any) => {
    const buttonStyles = ButtonStyles();
    const styles = FishResearchStyle();
	const { theme } = useTheme();

    const [questionsParams, setQuestionsParams] = useState<QuestionModel | null>(null);
    const [loading, setLoading] = useState(true);
    const [shouldResetFilters, setShouldResetFilters] = useState(false);

    const resetFilters = () =>
    {
        setShouldResetFilters(true);
        setTimeout(() => setShouldResetFilters(false), 100);
    }

    useEffect(() => {
        const createQuestions = async () => {
            try {
                const bodyTypes: BodyTypeModel[] = await getAllBodyType();
                const fins: FinModel[] = await getAllFins();
                const eyes: EyeModel[] = await getAllEyes();

                const questionsData : QuestionModel = QuestionsFactory.RequestToModel(bodyTypes, fins, eyes);
                setQuestionsParams(questionsData);
                // console.log("\x1b[36mQuestions data:\x1b[0m\n", JSON.stringify(questionsData, null, 2));
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        createQuestions();
    }, [])


    if (loading || !questionsParams) {
        return (
            <View style={styles.mainDiv}>
                <ActivityIndicator size="large" color={theme.iconColor} />
            </View>
        )
    }

    return (
        <FishListProvider>
            <AnswerProvider>
                <View style={styles.mainDiv}>
                    <TouchableOpacity style={buttonStyles.closeSearchButton} onPress={() => navigation.navigate("Poissons")}>
                        <Ionicons name='close' size={24} color={theme.iconColor}/>
                    </TouchableOpacity>
                    <Questions questionsParams={questionsParams} shouldResetFilters={shouldResetFilters}/>
                    <View style={styles.mainButtonsDiv}>
                        <TouchableOpacity style={[styles.button, {borderColor: '#ff000080', backgroundColor: '#ff333350', paddingHorizontal: 10}]} onPress={() => resetFilters()}>
                            <Text style={styles.text}>Réinitialiser les filtres</Text>
                        </TouchableOpacity>
                        <ViewFishButton/>
                    </View>
                </View>
            </AnswerProvider>
        </FishListProvider>
    )
}

export default FishResearch