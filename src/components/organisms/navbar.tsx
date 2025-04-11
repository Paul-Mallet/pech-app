import React, { useState } from 'react';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Text, StyleSheet } from 'react-native';
import QuizzScreen from '../../pages/quizzScreen.tsx';
import HomeScreen from '../../pages/homeScreen.tsx';
import LegislationScreen from '../../pages/legislationScreen.tsx';
import SettingsScreen from '../../pages/settingsScreen.tsx';
import NavBarStyles from '../../styles/organisms/navbarStyles.tsx';
import Colors from '../../styles/base/colors.tsx';
import { useNavigationState } from '@react-navigation/native';

type TabParamList = {
  Quizz: undefined;
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
  const currentRouteName = useNavigationState((state: { routes: { [x: string]: any; }; index: string | number; }) => {
    const route = state.routes[state.index];
    return route.name;
  });
  return (
    <Tab.Navigator
      tabBar={(props: { state: { routes: any[]; index: any } }) => {
        const visibleRoutes = props.state.routes.filter(route => route.name !== 'Quizz');
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
      screenOptions={function ({ route }: { route: { name: keyof TabParamList } }) {
        const isOnQuizz = currentRouteName === 'Quizz';
        const isAccueil = route.name === 'Accueil';

        let iconName: string;
        if (isAccueil) {
          iconName = isOnQuizz ? 'arrow-back' : 'home';
        } else if (route.name === 'Législation') {
          iconName = 'book-outline';
        } else if (route.name === 'Paramètres') {
          iconName = 'settings-outline';
        } else {
          iconName = 'help';
        }

        return {
          tabBarIcon: ({ color, size }: { color: string; size: number }) => {
            return (
              <Ionicons name={iconName as keyof typeof Ionicons.glyphMap} size={size} color={color} />
            );
          },
          tabBarLabel: ({ focused, color }: { focused: boolean; color: string }) => (
            <Text style={[NavBarStyles.tabLabel, focused && NavBarStyles.tabLabelFocused, { color }]}>
              {isAccueil ? (isOnQuizz ? 'Retour' : 'Accueil') : route.name}
            </Text>
          ),
          tabBarActiveTintColor: Colors.textHighlightDark,
          tabBarInactiveTintColor: Colors.textDark,
          tabBarStyle: NavBarStyles.tabBar,
        };
      }}
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
        name="Quizz"
        component={QuizzScreen}
        listeners={{
          tabPress: () => handleTabPress('Quizz'),
        }}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;