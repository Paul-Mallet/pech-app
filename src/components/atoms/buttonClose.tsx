import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import FishAIScreenStyles from '../../styles/molecules/fishAIScreenStyles.tsx';

interface ButtonProps {
  buttonText: string;
  onPressFunction: () => void;
}

const ButtonClose: React.FC<ButtonProps> = ({ buttonText, onPressFunction }) => {
  const styles = FishAIScreenStyles();

  return (
    <TouchableOpacity style={styles.buttonClose} onPress={onPressFunction}>
        <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default ButtonClose;