import * as React from 'react';
import { useCallback } from 'react';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import HomeScreen from '../../pages/homeScreen.tsx';
import LegislationScreen from '../../pages/legislationScreen.tsx';
import SettingsScreen from '../../pages/settingsScreen.tsx';
import NavBarStyles from '../../styles/organisms/navbarStyles.tsx';
import { useTheme } from './ThemeContext.tsx';
import FishScreen from '../../pages/fishScreen.tsx';
// import FishResearch from '../../pages/fishResearchScreen.tsx';
import EventBus from './EventBus.tsx';
import FishAICamera from '../../pages/fishAICameraScreen.tsx';

type TabParamList = {
  // FishResearch: undefined;
  Poissons: undefined;
  Accueil: undefined;
  Réglementation: undefined;
  Paramètres: undefined;
};

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { theme } = useTheme();
	const styles = NavBarStyles();

  // const currentRouteName = useNavigationState((state: { routes: { [x: string]: any; }; index: string | number; }) => {
  //   const route = state.routes[state.index];
  //   return route.name;
  // });
  const poissonsTabPress = useCallback(() => EventBus.emit('poissonsTabPress'), []);
  const onLegislationTabPress = useCallback(() => EventBus.emit('legislationTabPress'), []);

  const onHomeTabPress = useCallback((e: any, navigation: any) => {
    e.preventDefault();
    EventBus.emit('homeTabPress');
    navigation.navigate('Accueil');
  }, []);

  const screenOptions = useCallback(({ route }: { route: { name: keyof TabParamList } }) => ({
    tabBarIcon: ({ color, size, focused }: { color: string; size: number; focused: boolean }) => {
      let iconName: string;
      switch (route.name) {
        case 'Accueil':
          iconName = focused ? 'home' : 'home-outline';
          break;
        case 'Poissons':
          iconName = focused ? 'fish' : 'fish-outline';
          break;
        case 'Réglementation':
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
    <View>
      <Text numberOfLines={1} style={[ styles.tabLabel, {color} ]}>
        {route.name}
      </Text>
    </View>
    ),
  }), [theme.textHighlightDark, theme.textDark, styles]);

  return (
      <Tab.Navigator
        tabBar={(props: { state: { routes: any[]; index: any } }) => {
          const visibleRoutes = props.state.routes.filter(route => route.name !== 'FishResearch' && route.name !== 'FishAICamera');
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
                index: adjustedIndex === -1 ? 1 : adjustedIndex,
              }}
            />
          );
        }}
        screenOptions={screenOptions}
      >
      <Tab.Screen
        name="Accueil"
        component={HomeScreen}
        listeners={({ navigation }: { navigation: any }) => ({
          tabPress: (e: { preventDefault: () => void; }) => onHomeTabPress(e, navigation),
        })}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Poissons"
        component={FishScreen}
        listeners={{ tabPress: poissonsTabPress }}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Réglementation"
        component={LegislationScreen}
        listeners={{ tabPress: onLegislationTabPress }}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Paramètres"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      {/* <Tab.Screen
        name="FishResearch"
        component={FishResearch}
        options={{ headerShown: false }}
      /> */}
      <Tab.Screen
        name="FishAICamera"
        component={FishAICamera}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;