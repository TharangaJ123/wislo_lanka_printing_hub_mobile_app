import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
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
  <Text style={{ color: focused ? COLORS.primary : '#383737ff', fontWeight: '700', fontSize: 11 }}>
    {title}
  </Text>
);

const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="HomeTab"
    screenOptions={{
      headerShown: false,
      tabBarStyle: { height: 78, paddingBottom: 22, paddingTop: 12 },
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: '#383737ff',
    }}
  >
    <Tab.Screen
      name="HomeTab"
      component={HomeScreen}
      options={{
        tabBarLabel: ({ focused }) => <TabLabel title="Home" focused={focused} />,
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons
            name={focused ? 'home' : 'home-outline'}
            size={size ?? 22}
            color={color}
          />
        ),
      }}
    />
    <Tab.Screen
      name="CategoriesTab"
      component={CategoriesScreen}
      options={{
        tabBarLabel: ({ focused }) => <TabLabel title="Categories" focused={focused} />,
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons
            name={focused ? 'grid' : 'grid-outline'}
            size={size ?? 22}
            color={color}
          />
        ),
      }}
    />
    <Tab.Screen
      name="PostAdTab"
      component={PostAdScreen}
      options={{
        tabBarLabel: ({ focused }) => <TabLabel title="Post Ad" focused={focused} />,
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons
            name={focused ? 'add-circle' : 'add-circle-outline'}
            size={(size ?? 22) + 2}
            color={color}
          />
        ),
      }}
    />
    <Tab.Screen
      name="MessagesTab"
      component={MessagesScreen}
      options={{
        tabBarLabel: ({ focused }) => <TabLabel title="Messages" focused={focused} />,
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons
            name={focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline'}
            size={size ?? 22}
            color={color}
          />
        ),
      }}
    />
    <Tab.Screen
      name="ProfileTab"
      component={ProfileScreen}
      options={{
        tabBarLabel: ({ focused }) => <TabLabel title="Profile" focused={focused} />,
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons
            name={focused ? 'person' : 'person-outline'}
            size={size ?? 22}
            color={color}
          />
        ),
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
