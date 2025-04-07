import React, { ReactNode } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import GlobalStyles from '../../themes/globalStyles.tsx';

interface HomeCardProps {
  children: ReactNode;
  onPress?: () => void;
}

const HomeCard = ({ children, onPress }: HomeCardProps) => {
  return (
    <View style={GlobalStyles.homeCard}>
      {children}
    </View>
  );
};

export default HomeCard;
