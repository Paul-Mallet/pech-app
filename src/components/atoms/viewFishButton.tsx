import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import ButtonStyles from "../../styles/atoms/viewFishButtonStyles.tsx";
import { useAnswers } from "../../@config/answerContext.tsx";

const ViewFishButton = () => {
    const {answers} = useAnswers();
    const styles = ButtonStyles();

    // faire le call api ici, puis update numberOfFish selon la taille
    // et afficher la page qu'a fait paul pour visualiser les poissons dispo

    let numberOfFish : number = 0;

    return (
        <View style={styles.mainDiv}>
            <TouchableOpacity style={styles.button} onPress={() => {alert('pilou')}}>
                <Text style={styles.text}>Voir les poissons ({numberOfFish})</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ViewFishButton;