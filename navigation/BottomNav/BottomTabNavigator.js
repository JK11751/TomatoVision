import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../../components/TabBarIcon';

import TabBarLabel from '../../components/TabBarLabel';
import HomeScreen from '../../screens/HomeScreen';
import DiseaseListScreen from '../../screens/DiseaseListScreen';
import ProfileScreen from '../../screens/ProfileScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function CustomerBottomTabNavigator() {
  

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarLabel: () => <TabBarLabel label='Home' />,
          tabBarIcon: () => <TabBarIcon name='md-home' />,
          headerShown: false
        }}
        
      />

      <BottomTab.Screen
        name='Diseases'
        component={DiseaseListScreen}
        options={{
          tabBarLabel: () => <TabBarLabel label='Plant diseases' />,
          tabBarIcon: () => <TabBarIcon name='md-leaf' />,
          headerShown: false
        }}
      />
      <BottomTab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          tabBarLabel: () => <TabBarLabel label='Profile' />,
          tabBarIcon: () => <TabBarIcon name='md-person' />,
          headerShown: false
        }}
      />
    </BottomTab.Navigator>
  );
}
