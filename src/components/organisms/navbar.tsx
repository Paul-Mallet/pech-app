import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Text, StyleSheet } from 'react-native';
import HomeScreen from '../../pages/homeScreen.tsx';
import SearchScreen from '../../pages/searchScreen.tsx';
import SettingsScreen from '../../pages/settingsScreen.tsx';
import Colors from '../../themes/colors.tsx';

type TabParamList = {
  Accueil: undefined;
  Législation: undefined;
  Paramètres: undefined;
};

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const [activeTab, setActiveTab] = useState('');

  const handleTabPress = (tabName: string) => {
    setActiveTab(tabName); // Update the active tab
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }: { route: { name: keyof TabParamList } }) => ({
        tabBarIcon: ({ color, size, focused }: { color: string; size: number; focused: boolean }) => {
          let iconName: string;
          switch (route.name)
          {
            case 'Accueil':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Législation':
              iconName = focused ? 'book' : 'book-outline';
              break;
            case 'Paramètres':
              iconName = focused ? 'settings' : 'settings-outline';
              break;
            default:
              iconName = 'help';
          }
          return <Ionicons name={iconName as keyof typeof Ionicons.glyphMap} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.textHighlightDark,
        tabBarInactiveTintColor: Colors.textDark,
        tabBarStyle: {
          backgroundColor: Colors.navBarBackground,
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
          width: '100%',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          elevation: 0, // Android shadow removal
          shadowColor: 'transparent', // iOS shadow removal
          borderTopWidth: 0,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        },
        tabBarLabel: ({ focused, color }: { focused: boolean; color: string }) => (
          <Text style={[styles.tabLabel, focused && styles.tabLabelFocused, { color }]}>  
            {route.name}
          </Text>
        ),
      })}
    >
      <Tab.Screen
        name="Accueil"
        component={HomeScreen}
        listeners={{
          tabPress: () => handleTabPress('Accueil'),
        }}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Législation"
        component={SearchScreen}
        listeners={{
          tabPress: () => handleTabPress('Législation'),
        }}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Paramètres"
        component={SettingsScreen}
        listeners={{
          tabPress: () => handleTabPress('Paramètres'),
        }}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabLabel: {
    fontSize: 14,
    fontWeight: 'normal',
  },
  tabLabelFocused: {
    fontWeight: 'bold',
  },
});

export default BottomTabNavigator;