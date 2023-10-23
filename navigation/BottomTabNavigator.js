import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';
import Contact from '../screens/Contact';
import Notification from '../screens/Notification';
import Account from '../screens/Account';
import Home from '../screens/Home';

const Tab = createBottomTabNavigator();

const BottomTabNavigator=()=> {

  return (
    <Tab.Navigator>
    <Tab.Screen
    name="Home"
    component={Home}
    options={{
      
      tabBarIcon: ({ color, size }) => (
        <FontAwesome5 name="home" size={size} color={color} />
      ),
      headerShown: false
    }}
    />
    <Tab.Screen
    name="Contact"
    component={Contact}
    options={{
      tabBarIcon: ({ color, size }) => (
        <FontAwesome5 name="phone" size={size} color={color} />
      ),
      headerShown: false
    }}
    />
    <Tab.Screen
     name="Notifications"
     component={Notification}
     options={{
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="notifications" size={24} color={color} />
      ),
      headerShown: false
    }}
    />
    <Tab.Screen
    name="Account"
    component={Account}
    options={{
      tabBarIcon: ({ color, size }) => (
        <FontAwesome5 name="user" size={size} color={color} />
      ),
      headerShown: false
    }}
    />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
