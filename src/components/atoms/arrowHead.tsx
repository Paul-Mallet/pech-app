import React from "react";
import { View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import ArrowHeadStyles from "../../styles/atoms/arrowHeadStyles.tsx";

//View necessary?
const ArrowHead = () => {
    const styles = ArrowHeadStyles();

    return (
        <View>
            <Ionicons name='chevron-forward' size={styles.size} color={styles.color} />
        </View>
    );
}

export default ArrowHead;