import React, { useEffect } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import firebase from 'firebase/compat/app';
import Background from '../components/Background';

const AuthLoading = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (user.emailVerified) {
          // User is logged in and email is verified
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
        } else {
          // User is logged in but email is not verified
          Alert.alert(
            'Email Not Verified',
            'Please verify your email to continue.',
            [
              {
                text: 'OK',
                onPress: () => {
                  // You can choose what to do when the user dismisses the alert
                  // You might want to send a verification email here as well.
                },
              },
            ]
          );
        }
      } else {
        // User is not logged in
        navigation.reset({
          index: 0,
          routes: [{ name: 'AuthLoading' }],
        });
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, [navigation]);

  return (
    <Background>
      <ActivityIndicator size="large" color="#121330" />
    </Background>
  );
};

export default AuthLoading;
