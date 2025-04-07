import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
// <<<<<<< HEAD:src/components/organisms/navbar.tsx
import { Text, StyleSheet } from 'react-native';
import HomeScreen from '../../pages/homeScreen.tsx';
import SearchScreen from '../../pages/searchScreen.tsx';
import SettingsScreen from '../../pages/settingsScreen.tsx';
// =======
// import { Text, StyleSheet } from 'react-native';
// import HomeScreen from '../pages/homeScreen.tsx';
// import SearchScreen from '../pages/searchScreen.tsx';
// import SettingsScreen from '../pages/settingsScreen.tsx';
// >>>>>>> origin/styling-home-page-pamallet:components/organisms/navbar.tsx

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const [activeTab, setActiveTab] = useState('');

  const handleTabPress = (tabName: string) => {
    setActiveTab(tabName); // Update the active tab
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: string;
          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Search':
              iconName = focused ? 'book' : 'book-outline';
              break;
            case 'Settings':
              iconName = focused ? 'settings' : 'settings-outline';
              break;
            default:
              iconName = 'help'; // fallback
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#31909C',
        tabBarInactiveTintColor: '#003B44',
        tabBarStyle: {
          backgroundColor: '#31909C52',
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
        tabBarLabel: ({ focused, color }) => (
          <Text style={[styles.tabLabel, focused && styles.tabLabelFocused, { color }]}>  
            {route.name}
          </Text>
        ),
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        listeners={{
          tabPress: () => handleTabPress('Home'),
        }}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        listeners={{
          tabPress: () => handleTabPress('Search'),
        }}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        listeners={{
          tabPress: () => handleTabPress('Settings'),
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
