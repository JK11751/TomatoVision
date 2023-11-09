import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PredictionScreen from '../screens/PredictionScreen'; 
import DiseaseDetailedScreen from '../screens/DiseaseDetailedScreen';
import InitialScreen from "../screens/InitialScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Onboarding from "../screens/Onboarding";
import Account from "../screens/Account";
import SignUp from "../screens/SignUp";
import Login from "../screens/Login";
import BottomTabNavigator from "../navigation/BottomNav/BottomTabNavigator";
import ImageScreen from "../screens/Image";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import AuthLoading from "../screens/AuthLoading";
import { FIREBASE_CONFIG } from "../core/config";


const Stack = createStackNavigator();

if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG);
}

const Navigation = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator
      initialRouteName="AuthLoading"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="AuthLoading"
        component={AuthLoading}
      />
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="profile"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Account"
          component={Account}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
         <Stack.Screen
                name='PredictionScreen'
                component={PredictionScreen}
                options={{
                  headerTintColor: '#1A8766',
                  title: '',
                  headerTransparent: true
                }}
              />
              <Stack.Screen
                name='DetailedScreen'
                component={DiseaseDetailedScreen}
                options={{
                  headerTintColor: 'white',
                  title: '',
                  headerTransparent: true
                }}
              />
        <Stack.Screen
          name="DashBoard"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CameraScreen"
          component={ImageScreen}
          options={{ headerShown: false }}
        />
          <Stack.Screen
          name="InitialScreen"
          component={InitialScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
