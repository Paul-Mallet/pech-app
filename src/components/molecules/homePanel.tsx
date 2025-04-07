import React, { ReactNode } from 'react';
import { ScrollView } from 'react-native';
import GlobalStyles from '../../styles/base/globalStyles.tsx';

interface HomeCardProps {
  children: ReactNode;
}

const HomePanel = ({ children }: HomeCardProps) => {
  return (
    <ScrollView style={GlobalStyles.homePanel}>
      {children}
    </ScrollView>
  );
};

export default HomePanel;