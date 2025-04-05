import React, { useState } from 'react';
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
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Text style={styles.text}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#3498db',
    borderRadius: 10,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
});

export default MyButton;
