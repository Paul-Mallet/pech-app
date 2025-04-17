import React from "react";
import { View, Text, Pressable } from "react-native";
import ButtonStyles from "../../styles/atoms/viewFishButtonStyles.tsx";
import { useAnswers } from "../../@config/answerContext.tsx";

const ViewFishButton = () => {
    const {answers} = useAnswers();

    // faire le call api ici, puis update numberOfFish selon la taille
    // et afficher la page qu'a fait paul pour visualiser les poissons dispo

    let numberOfFish : number = 0;

    return (
        <View style={ButtonStyles.mainDiv}>
            <Pressable style={ButtonStyles.button} onPress={() => {alert('pilou')}}>
                <Text style={ButtonStyles.text}>Voir les poissons ({numberOfFish})</Text>
            </Pressable>
        </View>
    )
}

export default ViewFishButton;