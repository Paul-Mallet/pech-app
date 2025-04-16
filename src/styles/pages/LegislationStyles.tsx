import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { useTheme } from '../../components/organisms/ThemeContext.tsx';

const LegislationStyles = () => {
  const { theme } = useTheme();

  const styles = useMemo(() => StyleSheet.create({
    legislationPanel: {
      display: "flex",
      flexDirection: "column",
      paddingTop: 0,
      paddingLeft: 8,
      paddingRight: 8,
      paddingBottom: 0,
      marginBottom: 60,
      marginTop: 110,
    },
    legislationParagraph: {
      position: "relative",
      width: '100%',
      padding: 8,
      borderRadius: 8,
      // overflow: 'hidden',
      shadowColor: '#00000010',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 5,
    },
  }), [theme]);

  return styles;
};

export default LegislationStyles;
