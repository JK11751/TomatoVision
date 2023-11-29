import React from "react";
import { ActivityIndicator, Alert } from "react-native";
import firebase from "firebase/compat/app";
import Background from "../components/Background";

const AuthLoading = ({ navigation }) => {
  
  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      if (user.emailVerified) {

        navigation.reset({
          index: 0,
          routes: [{ name: "DashBoard" }],
        });
      } else {
        // User is logged in but email is not verified
        Alert.alert(
          "Verify Email",
          "Please check your email for verification."
        );
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      }
    } else {
      // User is not logged in
      navigation.reset({
        index: 0,
        routes: [{ name: "Onboarding" }],
      });
    }
  });

  return (
    <Background>
      <ActivityIndicator size="large" color="red" />
    </Background>
  );
};

export default AuthLoading;
