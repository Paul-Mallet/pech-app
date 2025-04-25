import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import ButtonStyles from "../../styles/atoms/viewFishButtonStyles.tsx";
import { useFishList } from "../../@config/fishListContext.tsx";

const ViewFishButton = () => {
    const fishList = useFishList();
    const styles = ButtonStyles();

    let numberOfFish : number = fishList.fishList.length;

    return (
        <View style={styles.mainDiv}>
            <TouchableOpacity style={styles.button} onPress={() => {
                console.log("\x1b[36mFish list:\x1b[0m \n", JSON.stringify(fishList, null, 2))
            }}>
                <Text style={styles.text}>Voir les poissons ({numberOfFish})</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ViewFishButton;