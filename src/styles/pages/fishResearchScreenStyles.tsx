import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "../../components/organisms/ThemeContext.tsx";

const FishResearchStyle = () => {
    const { theme } = useTheme();
  
    const styles = useMemo(() => StyleSheet.create({
        mainDiv : {
            backgroundColor: theme.body,
            height: '100%', 
            width: '100%', 
        }
    }), [theme]);
  
    return styles;
  };
  
  export default FishResearchStyle;