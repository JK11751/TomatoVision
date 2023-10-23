import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ImageBackground,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import firebase from 'firebase/compat/app';
import { logoutUser, deleteUserAccount } from '../api/auth-api'; // Make sure to implement deleteUserAccount
import { useNavigation } from '@react-navigation/native';
import 'firebase/compat/auth';

const Account = () => {
  const navigation = useNavigation();
  const [isEditable, setIsEditable] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Fetch the user's name and email when the component mounts
  useEffect(() => {
    // Get the current user from Firebase Authentication
    const user = firebase.auth().currentUser;

    if (user) {
      // If a user is signed in, update the 'name' state with the user's display name
      const displayName = user.displayName;
      if (displayName) {
        setName(displayName);
      }

      // Update the 'email' state with the user's email
      const userEmail = user.email;
      if (userEmail) {
        setEmail(userEmail);
      }
    }
  }, []);

  const confirmDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action is irreversible.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => handleDeleteAccount(),
        
          style: 'destructive',
        },
      ],
    );
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUserAccount(); 
     
    } catch (error) {
      console.error('Error deleting account: ', error);
     
    }
  };

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleSaveClick = () => {
    setIsEditable(false);
    
  };

  const handleLogout = async () => {
    await logoutUser(); 

   
    navigation.navigate('Login'); 

    
    
  };

  return (
    <ImageBackground
      source={require('../assets/Background.png')}
      style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}
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

        <View style={{ alignItems: 'center' }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: 'bold',
              marginTop: 12,
              color: '#041E42',
            }}
          >
            My Account
          </Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <View  style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            paddingVertical: 5,
            borderRadius: 5,
            marginTop: 30,
            backgroundColor: isEditable ? 'lightgray' : 'transparent', 
          }}>
            <Ionicons
              name="ios-person"
              size={24}
              color="gray"
              style={{ marginLeft: 8 }}
            />
            {isEditable ? (
              <TextInput
                style={{
                  color: 'gray',
                  marginVertical: 10,
                  width: 300,
                  fontSize: 16,
                }}
                value={name}
                onChangeText={(text) => setName(text)}
              />
            ) : (
              <Text style={{ color: 'gray', fontSize: 16 }}>{name}</Text>
            )}
          </View>

          <View  style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            paddingVertical: 5,
            borderRadius: 5,
            marginTop: 30,
            backgroundColor: isEditable ? 'lightgray' : 'transparent', 
          }}>
            <MaterialIcons
              style={{ marginLeft: 8 }}
              name="email"
              size={24}
              color="gray"
            />
            {isEditable ? (
              <TextInput
                style={{
                  color: 'gray',
                  marginVertical: 10,
                  width: 300,
                  fontSize: 16,
                }}
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            ) : (
              <Text style={{ color: 'gray', fontSize: 16 }}>{email}</Text>
            )}
          </View>
        </View>

        <View style={{ marginTop: 40 }} />

        {isEditable ? (
          <Pressable
            style={{
              width: 400,
              backgroundColor: 'green',
              borderRadius: 6,
              marginLeft: 'auto',
              marginRight: 'auto',
              padding: 15,
            }}
            onPress={handleSaveClick}
          >
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 16,
                fontWeight: 'bold',
              }}
            >
              Save
            </Text>
          </Pressable>
        ) : (
          <Pressable
            style={{
              width: 400,
              backgroundColor: 'green',
              borderRadius: 6,
              marginLeft: 'auto',
              marginRight: 'auto',
              padding: 15,
            }}
            onPress={handleEditClick}
          >
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 16,
                fontWeight: 'bold',
              }}
            >
              Edit
            </Text>
          </Pressable>
        )}

        <Pressable style={{ marginTop: 15 }}>
          <Text
            style={{
              textAlign: 'center',
              color: 'gray',
              fontSize: 16,
            }}
            onPress={handleLogout}
          >
            Log Out
          </Text>
        </Pressable>
        <Pressable
  style={{
    width: 400,
    backgroundColor: 'red', // Use a red color for the delete button
    borderRadius: 6,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 15,
  }}
  onPress={confirmDeleteAccount}
>
  <Text
    style={{
      textAlign: 'center',
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
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
