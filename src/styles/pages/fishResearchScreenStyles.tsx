import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "../../components/organisms/ThemeContext.tsx";

const FishResearchStyle = () => {
    const { theme, font } = useTheme();
  
    const styles = useMemo(() => StyleSheet.create({
        mainDiv : {
            backgroundColor: theme.body,
            height: '100%', 
            width: '100%', 
        },
        mainButtonsDiv: {
            position: 'absolute',
            bottom: 70,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 6
        },
        button : {
            justifyContent: 'center',
            height: 30,
            borderRadius: 24,
            borderWidth: 2,
            borderColor: '#ff000080',
            backgroundColor: '#ff333350',
            paddingHorizontal: 10
        },
        text : {
            fontFamily: font.regular,
            color : theme.textDark,
            fontSize: 14,
        }
    }), [theme]);
  
    return styles;
  };
  
  export default FishResearchStyle;