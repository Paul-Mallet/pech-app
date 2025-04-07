import React from 'react';
import { View, Text, Button } from 'react-native';

const SettingsScreen = ({navigation}: {navigation: any}) => {
  return (
    <View>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

export default SettingsScreen;