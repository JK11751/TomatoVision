import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ImageBackground,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import firebase from "firebase/compat/app";
import { logoutUser, deleteUserAccount } from "../api/auth-api";
import { useNavigation } from "@react-navigation/native";
import "firebase/compat/auth";

const Account = () => {
  const navigation = useNavigation();
  const [isEditable, setIsEditable] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const user = firebase.auth().currentUser;

    if (user) {
      const displayName = user.displayName;
      if (displayName) {
        setName(displayName);
      }

      const userEmail = user.email;
      if (userEmail) {
        setEmail(userEmail);
      }
    }
  }, []);

  const confirmDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action is irreversible.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => handleDeleteAccount(),

          style: "destructive",
        },
      ]
    );
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUserAccount();
    } catch (error) {
      console.error("Error deleting account: ", error);
    }
  };
  const handleEditClick = () => {
    setIsEditable(true);
  };

  const confirmSaveChanges = () => {
    Alert.alert(
      "Save Changes",
      "Are you sure you want to update your profile?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Save",
          onPress: () => handleSaveChanges(),
          style: "destructive",
        },
      ]
    );
  };
  const handleSaveChanges = async () => {
    try {
      const user = firebase.auth().currentUser;
      if (user) {
        if (email !== user.email) { // Check if the new email is different
          if (!user.emailVerified) {
            // Send a new email verification if the email is not yet verified.
            await user.sendEmailVerification();
  
            // Initialize a state variable to track if the verification was successful
            let verificationSuccessful = false;
  
            // Set a timer for a 2-minute delay (adjust the time as needed)
            const verificationTimer = setTimeout(() => {
              if (!verificationSuccessful) {
                // If not verified after the delay, show an error
                console.log("Email verification failed");
                Alert.alert(
                  "Error",
                  "The email verification link was not clicked within 2 minutes. Profile update failed."
                );
              }
            }, 2 * 60 * 1000); // 2 minutes
  
            // Wait for email verification
            firebase.auth().onAuthStateChanged((updatedUser) => {
              if (updatedUser && updatedUser.emailVerified) {
                verificationSuccessful = true;
                clearTimeout(verificationTimer); // Clear the timer
  
                // Update the email in the state
                setEmail(updatedUser.email);
  
                // Update the user's display name
                user
                  .updateProfile({
                    displayName: name,
                  })
                  .then(() => {
                    setIsEditable(false);
                    Alert.alert("Success", "Profile updated successfully");
                  })
                  .catch((error) => {
                    console.error("Error updating profile: ", error);
                    Alert.alert("Error", "An error occurred while updating your profile");
                  });
              }
            });
          } else {
            // Update the display name if the email is already verified
            user
              .updateProfile({
                displayName: name,
              })
              .then(() => {
                setIsEditable(false);
                Alert.alert("Success", "Profile updated successfully");
              })
              .catch((error) => {
                console.error("Error updating profile: ", error);
                Alert.alert("Error", "An error occurred while updating your profile");
              });
          }
        }
      }
    } catch (error) {
      console.error("Error updating profile: ", error);
      Alert.alert("Error", "An error occurred while updating your profile");
    }
  };
  
  
  

  const handleLogout = async () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Log Out',
          onPress: async () => {
            try {
              await logoutUser();
              navigation.navigate('Login');
            } catch (error) {
              console.error('An error occurred during logout:', error);
            }
          },
          style: 'destructive', 
        },
      ],
    );
  };
  

  return (
    <ImageBackground
      source={require("../assets/Background.png")}
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View marginTop={40}>
          <Image
            style={{ width: 150, height: 100 }}
            source={{
              uri: "../assets/tomato_PNG12588.png",
            }}
          />
        </View>

        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              marginTop: 12,
              color: "#041E42",
            }}
          >
            My Account
          </Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
              backgroundColor: isEditable ? "lightgray" : "transparent",
            }}
          >
            <Ionicons
              name="ios-person"
              size={24}
              color="gray"
              style={{ marginLeft: 8 }}
            />
            {isEditable ? (
              <TextInput
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: 16,
                }}
                value={name}
                onChangeText={(text) => setName(text)}
              />
            ) : (
              <Text style={{ color: "gray", fontSize: 16 }}>{name}</Text>
            )}
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
              backgroundColor: isEditable ? "lightgray" : "transparent",
            }}
          >
            <MaterialIcons
              style={{ marginLeft: 8 }}
              name="email"
              size={24}
              color="gray"
            />
            {isEditable ? (
              <TextInput
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: 16,
                }}
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            ) : (
              <Text style={{ color: "gray", fontSize: 16 }}>{email}</Text>
            )}
          </View>
        </View>

        <View style={{ marginTop: 40 }} />

        {isEditable ? (
          <Pressable
            style={{
              width: 400,
              backgroundColor: "green",
              borderRadius: 6,
              marginLeft: "auto",
              marginRight: "auto",
              padding: 15,
            }}
            onPress={confirmSaveChanges}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Save
            </Text>
          </Pressable>
        ) : (
          <Pressable
            style={{
              width: 400,
              backgroundColor: "green",
              borderRadius: 6,
              marginLeft: "auto",
              marginRight: "auto",
              padding: 15,
            }}
            onPress={handleEditClick}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Edit
            </Text>
          </Pressable>
        )}

        <Pressable
          style={{
            width: 400,
            backgroundColor: "gray",
            borderRadius: 6,
            marginTop:10,
            marginLeft: "auto",
            marginRight: "auto",
            padding: 15,
          }}
          onPress={handleLogout}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Log Out
          </Text>
        </Pressable>

        <Pressable
          style={{
            width: 400,
            backgroundColor: "red",
            borderRadius: 6,
            marginLeft: "auto",
            marginTop:10,
            marginRight: "auto",
            padding: 15,
          }}
          onPress={confirmDeleteAccount}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Delete Account
          </Text>
        </Pressable>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Account;
