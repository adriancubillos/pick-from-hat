import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

import HomeScreen from '../screens/HomeScreen';
import PickScreen from '../screens/PickScreen';
import ManageItemsScreen from '../screens/ManageItemsScreen';
import HistoryScreen from '../screens/HistoryScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6200ee',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Pick From Hat' }}
        />
        <Stack.Screen
          name="Pick"
          component={PickScreen}
          options={{ title: 'Pick Random Item' }}
        />
        <Stack.Screen
          name="ManageItems"
          component={ManageItemsScreen}
          options={{ title: 'Manage Items' }}
        />
        <Stack.Screen
          name="History"
          component={HistoryScreen}
          options={{ title: 'History' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
