import React from 'react';
import ButtonStyles from '../../styles/atoms/buttonStyles.tsx';
import { Text, TouchableOpacity } from 'react-native';

const CTAButton = () => {
  return (
    <TouchableOpacity style={ButtonStyles.container} onPress={() => console.log('call goToLegislation()')}>
      <Text
        style={ButtonStyles.text}  
      >
        Législation
      </Text>
    </TouchableOpacity>
  );
};

export default CTAButton;