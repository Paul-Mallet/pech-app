import React from "react";
import { Ionicons } from '@expo/vector-icons';
import { View } from "react-native";
import Colors from "../../styles/base/colors.tsx";

const ArrowHead = () => {
    return (
        <View>
            <Ionicons name='chevron-forward' size={20} color={Colors.textDark}/>
        </View>
    )
}

export default ArrowHead;