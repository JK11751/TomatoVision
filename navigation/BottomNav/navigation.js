import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import PredictionScreen from '../../screens/PredictionScreen';
import FormLogin from '../../components/forms/FormLogin';
import FormRegister from '../../components/forms/FormRegister';
import InitialScreen from '../../screens/InitialScreen';
import DetailedScreen from '../../screens/DiseaseDetailedScreen';

const Stack = createStackNavigator();
function App() {
    return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle='default' />}

          <NavigationContainer >
            <Stack.Navigator>
              <Stack.Screen
                name='InitialScreen'
                component={InitialScreen}
                options={{
                  headerTintColor: '#1D446F',
                  title: '',
                  headerTransparent: true
                }}
              />

              <Stack.Screen
                name='LoginScreen'
                component={FormLogin}
                options={{
                  headerTintColor: '#1D446F',
                  title: '',
                  headerTransparent: true,
                  headerLeft: null
                }}
              />

              <Stack.Screen
                name='RegisterScreen'
                component={FormRegister}
                options={{
                  headerTintColor: 'white',
                  title: '',
                  headerTransparent: true
                }}
              />

              <Stack.Screen
                name='Home'
                component={BottomTabNavigator}
                options={{
                  headerTintColor: '#1D446F',
                  title: '',
                  headerTransparent: true,
                  headerLeft: null
                }}
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
                component={DetailedScreen}
                options={{
                  headerTintColor: 'white',
                  title: '',
                  headerTransparent: true
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
    
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});

export default App;
