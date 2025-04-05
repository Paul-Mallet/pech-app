import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import GlobalStyles from './styles.tsx';

interface HomeTextCardProps {
    text: string;
}

const MiniFishPicture = () => {
    return (
      <View>
        <Image
          source={{ uri: 'https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630' }}
          style={GlobalStyles.miniImg}
          resizeMode="cover"
        />
      </View>
    );
  };

export default MiniFishPicture;