import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from '../components/organisms/navbar.tsx';
import FishResearch from './fishResearchScreen.tsx';
import FishAICamera from './fishAICameraScreen.tsx';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={BottomTabNavigator} />
      <Stack.Screen name="FishResearch" component={FishResearch} />
      <Stack.Screen name="FishAICamera" component={FishAICamera} />
    </Stack.Navigator>
  );
};

export default MainNavigator;