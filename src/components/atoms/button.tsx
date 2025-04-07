import React, { useState } from 'react';
import ButtonStyles from '../../styles/atoms/buttonStyles.tsx';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type ButtonTextProps = {
  text: string;
};

const MyButton = (props: ButtonTextProps) => {
  const [buttonTitle, setButtonTitle] = useState(props.text); // Start with passed prop

  const handlePress = () => {
    setButtonTitle('Clicked!');
  };

  return (
    <TouchableOpacity onPress={handlePress} style={ButtonStyles.container}>
      <Text style={ButtonStyles.text}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};


export default MyButton;
