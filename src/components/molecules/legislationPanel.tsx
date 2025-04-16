import React, { ReactNode } from 'react';
import { ScrollView } from 'react-native';
import LegislationStyles from '../../styles/pages/LegislationStyles.tsx';

interface LegislationCardProps {
  children?: ReactNode;
}

const LegislationPanel = ({ children }: LegislationCardProps) => {
  const legislationStyles = LegislationStyles();
  return (
    <ScrollView style={legislationStyles.legislationPanel}>
      {children}
    </ScrollView>
  );
};

export default LegislationPanel;