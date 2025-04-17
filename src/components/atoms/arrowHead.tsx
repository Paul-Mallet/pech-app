import React from "react";
import { Ionicons } from '@expo/vector-icons';
import { View } from "react-native";
import { useTheme } from "../organisms/ThemeContext.tsx";

const ArrowHead = () => {
    const { theme } = useTheme();
    return (
        <View>
            <Ionicons name='chevron-forward' size={20} color={theme.textDark}/>
        </View>
    )
}

export default ArrowHead;