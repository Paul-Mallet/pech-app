import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text} from 'react-native';
import NavBarStyles from '../../styles/organisms/navbarStyles.tsx';
import HomeScreen from '../../pages/homeScreen.tsx';
import SearchScreen from '../../pages/searchScreen.tsx';
import SettingsScreen from '../../pages/settingsScreen.tsx';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const [activeTab, setActiveTab] = useState('');

  const handleTabPress = (tabName: string) => {
    setActiveTab(tabName); // Update the active tab
  };

  return (
    <Tab.Navigator
      screenOptions={({route} : any) => ({
        tabBarIcon: ({ color, size, focused } : any) => {
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
        tapBarStyle: NavBarStyles.tapBar,
        tabBarLabel: ({ focused, color } : any) => (
          <Text style={[NavBarStyles.tabLabel, focused && NavBarStyles.tabLabelFocused, { color }]}>  
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

export default BottomTabNavigator;
