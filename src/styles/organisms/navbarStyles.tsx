import { StyleSheet } from "react-native";
import { useTheme } from "../../components/organisms/ThemeContext.tsx";
import { useMemo } from "react";

const NavBarStyles = () => {
  const { theme, font } = useTheme();

  const styles = useMemo(() => StyleSheet.create({
    tabLabel: {
      fontSize: 12,
      fontFamily: font.regular,
    },
    tabLabelFocused: {
      fontFamily: font.bold,
    },
    tabBar: {
      backgroundColor: theme.navBarBackground,
      height: 60,
      paddingBottom: 5,
      paddingTop: 5,
      width: '100%',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      elevation: 0, // Android shadow removal
      shadowColor: 'transparent', // iOS shadow removal
      borderTopWidth: 0,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
    },
  }), [theme, font]);

  return styles;
};

export default NavBarStyles;
