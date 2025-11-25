import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS } from '../theme/colors';
import HomeScreen from '../screens/HomeScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import AdsListScreen from '../screens/AdsListScreen';
import AdDetailsScreen from '../screens/AdDetailsScreen';
import PostAdScreen from '../screens/PostAdScreen';
import MessagesScreen from '../screens/MessagesScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabLabel = ({ title, focused }) => (
  <Text style={{ color: focused ? COLORS.primary : '#8CA3BC', fontWeight: '700', fontSize: 11 }}>
    {title}
  </Text>
);

const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="HomeTab"
    screenOptions={{
      headerShown: false,
      tabBarStyle: { height: 64, paddingBottom: 10, paddingTop: 8 },
    }}
  >
    <Tab.Screen
      name="HomeTab"
      component={HomeScreen}
      options={{
        tabBarLabel: ({ focused }) => <TabLabel title="Home" focused={focused} />,
      }}
    />
    <Tab.Screen
      name="CategoriesTab"
      component={CategoriesScreen}
      options={{
        tabBarLabel: ({ focused }) => <TabLabel title="Categories" focused={focused} />,
      }}
    />
    <Tab.Screen
      name="PostAdTab"
      component={PostAdScreen}
      options={{
        tabBarLabel: ({ focused }) => <TabLabel title="Post Ad" focused={focused} />,
      }}
    />
    <Tab.Screen
      name="MessagesTab"
      component={MessagesScreen}
      options={{
        tabBarLabel: ({ focused }) => <TabLabel title="Messages" focused={focused} />,
      }}
    />
    <Tab.Screen
      name="ProfileTab"
      component={ProfileScreen}
      options={{
        tabBarLabel: ({ focused }) => <TabLabel title="Profile" focused={focused} />,
      }}
    />
  </Tab.Navigator>
);

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={TabNavigator} />
        <Stack.Screen name="AdsList" component={AdsListScreen} />
        <Stack.Screen name="AdDetails" component={AdDetailsScreen} />
        <Stack.Screen name="PostAd" component={PostAdScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
