import React, { useState } from 'react';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';
// import QuizzScreen from '../../pages/quizzScreen.tsx';
import HomeScreen from '../../pages/homeScreen.tsx';
import LegislationScreen from '../../pages/legislationScreen.tsx';
import SettingsScreen from '../../pages/settingsScreen.tsx';
import NavBarStyles from '../../styles/organisms/navbarStyles.tsx';
import { useTheme } from './ThemeContext.tsx';
import { useNavigationState } from '@react-navigation/native';
import FishScreen from '../../pages/fishScreen.tsx';
import FishResearch from '../../pages/fishResearchScreen.tsx';

type TabParamList = {
  FishResearch: undefined;
  Poissons: undefined;
  Accueil: undefined;
  Législation: undefined;
  Paramètres: undefined;
};

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { theme, font } = useTheme();
	const styles = NavBarStyles();
  const [activeTab, setActiveTab] = useState('');

  const handleTabPress = (tabName: string) => {
    setActiveTab(tabName); // Update the active tab
  };
  const currentRouteName = useNavigationState((state: { routes: { [x: string]: any; }; index: string | number; }) => {
    const route = state.routes[state.index];
    return route.name;
  });
  return (
      <Tab.Navigator
        tabBar={(props: { state: { routes: any[]; index: any } }) => {
          const visibleRoutes = props.state.routes.filter(route => route.name !== 'FishResearch');
          const realIndex = props.state.index;
          const adjustedIndex = visibleRoutes.findIndex(
            route => route.key === props.state.routes[realIndex]?.key
          );

          return (
            <BottomTabBar
              {...props}
              state={{
                ...props.state,
                routes: visibleRoutes,
                index: adjustedIndex === -1 ? 0 : adjustedIndex,
              }}
            />
          );
        }}
        screenOptions={({ route }: { route: { name: keyof TabParamList } }) => ({
          tabBarIcon: ({ color, size, focused }: { color: string; size: number; focused: boolean }) => {
            let iconName: string;
            switch (route.name)
            {
              case 'Accueil':
                iconName = focused ? 'home' : 'home-outline';
                break;
              case 'Poissons':
                iconName = focused ? 'fish' : 'fish-outline';
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
          tabBarActiveTintColor: theme.textHighlightDark,
          tabBarInactiveTintColor: theme.textDark,
          tabBarStyle: styles.tabBar,
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
        listeners={({ navigation }: { navigation: any }) => ({
          tabPress: (e: { preventDefault: () => void; }) => {
            e.preventDefault();
            navigation.navigate('Accueil');
          },
        })}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Poissons"
        component={FishScreen}
        listeners={{
          tabPress: () => handleTabPress('Poissons'),
        }}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Législation"
        component={LegislationScreen}
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
      <Tab.Screen
        name="FishResearch"
        component={FishResearch}
        listeners={{
          tabPress: () => handleTabPress('FishResearch'),
        }}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;