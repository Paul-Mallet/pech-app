import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from '../components/organisms/navbar.tsx';
import QuizzScreen from './quizzScreen.tsx';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={BottomTabNavigator} />
      <Stack.Screen name="Quizz" component={QuizzScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;