import React, { ReactNode } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import GlobalStyles from './globalStyles.tsx';

interface HomeCardProps {
  children: ReactNode;
  onPress?: () => void;
}

const HomeCard = ({ children, onPress }: HomeCardProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={GlobalStyles.card}>
      {children}
    </TouchableOpacity>
  );
};

export default HomeCard;
