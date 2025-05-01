import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useFishList } from "../../@config/fishListContext.tsx";
import ButtonStyles from "../../styles/atoms/viewFishButtonStyles.tsx";

const ViewFishButton = () => {
    const fishList = useFishList();
    const styles = ButtonStyles();
    let numberOfFish : number = fishList.fishList.length;

    return (
        <View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.text}>Voir les poissons ({numberOfFish})</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ViewFishButton;