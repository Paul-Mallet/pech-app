import React, { ReactNode } from 'react';
import { ScrollView, Text } from 'react-native';
import GlobalStyles from '../../styles/base/globalStyles.tsx';

interface LegislationCardProps {
  children?: ReactNode;
}

const LegislationPanel = ({ children }: LegislationCardProps) => {
  return (
    <ScrollView style={GlobalStyles.legislationPanel}>
      {children || <Text style={GlobalStyles.centered}>Aucun contenu</Text>}
    </ScrollView>
  );
};

export default LegislationPanel;