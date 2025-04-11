import React, { ReactNode } from 'react';
import { ScrollView, Text } from 'react-native';
import GlobalStyles from '../../styles/base/globalStyles.tsx';

interface HomeCardProps {
  children?: ReactNode;
}

const HomePanel = ({ children }: HomeCardProps) => {
	const styles = GlobalStyles();
  return (
    <ScrollView style={styles.homePanel}>
      {children || <Text>Aucun contenu</Text>}
    </ScrollView>
  );
};

export default HomePanel;