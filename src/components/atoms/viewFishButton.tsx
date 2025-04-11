import React from "react";
import { View, Text, Pressable } from "react-native";
import ButtonStyles from "../../styles/atoms/viewFishButtonStyles.tsx";

const ViewFishButton = ({numberOfFish} : {numberOfFish : number}) => {

    return (
        <View style={ButtonStyles.mainDiv}>
            <Pressable style={ButtonStyles.button} onPress={() => {alert('pilou')}}>
                <Text style={ButtonStyles.text}>Voir les poissons ({numberOfFish})</Text>
            </Pressable>
        </View>
    )
}

export default ViewFishButton;