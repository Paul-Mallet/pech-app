import React, { ReactNode } from 'react';
import { ScrollView, Text } from 'react-native';
import GlobalStyles from '../../styles/base/globalStyles.tsx';

interface HomeCardProps {
  children?: ReactNode;
}

const HomePanel = ({ children }: HomeCardProps) => {
  return (
    <ScrollView style={GlobalStyles.homePanel}>
      {children || <Text>Aucun contenu</Text>}
    </ScrollView>
  );
};

export default HomePanel;