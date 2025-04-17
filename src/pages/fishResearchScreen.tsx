import React, { useState } from "react"
import { Button, View , Text, Pressable} from "react-native"
import ButtonStyles from "../styles/atoms/buttonStyles.tsx"
import { Ionicons } from '@expo/vector-icons';
import Questions from "../components/organisms/questions.tsx";
import ViewFishButton from "../components/atoms/viewFishButton.tsx";
import FishResearchStyle from "../styles/pages/fishResearchScreenStyles.tsx";
import { AnswerProvider } from "../@config/answerContext.tsx";
import { useTheme } from "../components/organisms/ThemeContext.tsx";

const FishResearch = ({navigation} : any) => {
    const buttonStyles = ButtonStyles();
    const styles = FishResearchStyle();
	const { theme } = useTheme();
    return (
        <>
            <AnswerProvider>
                <View style={styles.mainDiv}>
                    <Pressable style={buttonStyles.searchButton} onPress={() => navigation.goBack()}>
                        <Ionicons name='close-circle' size={70} color={theme.roundButton}/>
                    </Pressable>
                    <Questions navigation={navigation}/>
                    <ViewFishButton/>
                </View>
            </AnswerProvider>
        </>
    )
}

export default FishResearch