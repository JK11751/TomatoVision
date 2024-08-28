import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import TabBarIcon from "../components/TabBarIcon";
import { FontAwesome } from "@expo/vector-icons";
import TabBarLabel from "../components/TabBarLabel";
import HomeScreen from "../screens/HomeScreen";
import DiseaseListScreen from "../screens/DiseaseListScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/Colors";
const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

export default function CustomerBottomTabNavigator() {
  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          title: "",
          tabBarLabel: "Home",
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.black,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={28}
              color={focused ? COLORS.primary : COLORS.gray2}
            />
          ),
        }}
      />

      <BottomTab.Screen
        name="Diseases"
        component={DiseaseListScreen}
        options={{
          headerShown: false,
          tabBarLabel: "My plants",
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.black,
          tabBarIcon: ({ focused, color, position }) => {
            return (
              <Ionicons
                name={focused ? "leaf" : "leaf-outline"}
                size={28}
                color={focused ? COLORS.primary : COLORS.gray2}
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarLabel: "My account",
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.black,
          tabBarIcon: ({ focused }) => {
            return (
              <FontAwesome
                name={focused ? "user-circle" : "user-circle-o"}
                size={28}
                color={focused ? COLORS.primary : COLORS.gray2}
              />
            );
          },
        }}
      />

      {/* <BottomTab.Screen
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
      /> */}
    </BottomTab.Navigator>
  );
}
