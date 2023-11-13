import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, Modal } from 'react-native';
import firebase from "firebase/compat/app";
import { useNavigation } from "@react-navigation/native";
import "firebase/compat/auth";
import { logoutUser, deleteUserAccount } from "../api/auth-api";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

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
    setDeleteModalVisible(true);
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUserAccount();
      navigation.navigate('Onboarding');
      setDeleteModalVisible(false); // Close the modal after account deletion
    } catch (error) {
      console.error("Error deleting account: ", error);
    }
  };
  const handleLogout = async () => {
    setLogoutModalVisible(true);
  };

  const confirmLogout = async () => {
    try {
      await logoutUser();
      setLogoutModalVisible(false); // Close the modal after logout
      navigation.navigate('Login');
    } catch (error) {
      console.error('An error occurred during logout:', error);
    }
  };


  return (
    <ImageBackground
    source={require("../assets/Background.png")}
    style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
  >

    
    <View style={styles.container}>
      <View style={styles.image9Stack}>
        <ImageBackground
          source={require('../assets/Harvest.png')}
          resizeMode='contain'
          style={styles.image9}
          imageStyle={styles.image9_imageStyle}>
          <Text style={styles.profile}>Profile</Text>
          <View gradientImage='Gradient_RiPhkqO.png' style={styles.rect5}>
            <View style={styles.image2Row}>
              <Image
                source={require('../assets/images/profile.png')}
                resizeMode='contain'
                style={styles.image2}
              ></Image>
              <View style={styles.bittScottMangetColumn}>
                <Text style={styles.bittScottManget}>{name}</Text>
                <Text style={styles.bittGmailCom}>{email}</Text>
              </View>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.rect}>
          <TouchableOpacity onPress={handleLogout} style={styles.rect2}>
            <View style={styles.image5Row}>
              <Image
                source={require('../assets/images/exit.png')}
                resizeMode='contain'
                style={styles.image5}
              ></Image>
              <Text style={styles.editUserAccount}>Logout </Text>
              <Image
                source={require('../assets/images/next.png')}
                resizeMode='contain'
                style={styles.image6}
              ></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rect3}>
            <View style={styles.image4Row}>
              <Image
                source={require('../assets/images/hr.png')}
                resizeMode='contain'
                style={styles.image4}
              ></Image>
              <Text style={styles.helpAndSupport}>Help and Support</Text>
              <Image
                source={require('../assets/images/next.png')}
                resizeMode='contain'
                style={styles.image7}
              ></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rect4}   onPress={confirmDeleteAccount}>
            <View style={styles.image3Row}>
              <Image
                source={require('../assets/images/delete.png')}
                resizeMode='contain'
                style={styles.image3}
              ></Image>
              <Text style={styles.logout}>Delete Account</Text>
              <Image
                source={require('../assets/images/next.png')}
                resizeMode='contain'
                style={styles.image8}
              ></Image>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    <Modal
        animationType="slide"
        transparent={true}
        visible={logoutModalVisible}
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Are you sure you want to log out?</Text>
            <TouchableOpacity onPress={confirmLogout} marginBottom={20}>
              <Text style={styles.modalButtonRed}>Log Out</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setLogoutModalVisible(false)}>
              <Text style={styles.modalButton}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Are you sure you want to delete your account?</Text>
            <TouchableOpacity onPress={handleDeleteAccount}>
              <Text style={styles.modalButtonRed}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setDeleteModalVisible(false)}>
              <Text style={styles.modalButton}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image9: {
    top: 0,
    left: 0,
    width: 416,
    height: 401,
    position: 'absolute',
  },
  image9_imageStyle: {},
  profile: {
    fontFamily: '',
    fontSize: 28,
    color: 'black',
    marginTop: 113,
    marginLeft: 183,
  },
  rect5: {
    width: 247,
    height: 78,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 20,
    marginTop: 25,
    marginLeft: 86,
  },
  image2: {
    width: 50,
    height: 50,
  },
  bittScottManget: {
    fontFamily: '',
    color: 'black',
    fontSize: 20,
  },
  bittGmailCom: {
    fontFamily: '',
    color: 'black',
    fontSize: 16,
    marginTop: 2,
  },
  bittScottMangetColumn: {
    width: 200,
    marginLeft: 13,
    marginBottom: 9,
  },
  image2Row: {
    height: 50,
    flexDirection: 'row',
    marginTop: 14,
    marginLeft: 15,
    marginRight: 30,
  },
  rect: {
    top: 307,
    left: 23,
    width: 360,
    height: 438,
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 27,
  },
  rect2: {
    width: 294,
    height: 78,
    backgroundColor: 'white',
    borderRadius: 97,
    flexDirection: 'row',
    marginTop: 63,
    marginLeft: 36,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    elevation: 5,
    shadowOpacity: 0.16,
    shadowRadius: 10,
  },
  image5: {
    width: 40,
    height: 46,
    marginTop: 6,
  },
  editUserAccount: {
    fontFamily: '',
    color: '#121212',
    marginLeft: 10,
    marginTop: 22,
    fontSize: 16,
  },
  image6: {
    width: 29,
    height: 58,
    marginLeft: 120,
  },
  image5Row: {
    height: 58,
    flexDirection: 'row',
    flex: 1,
    marginRight: 21,
    marginLeft: 27,
    marginTop: 9,
  },
  rect3: {
    width: 294,
    height: 78,
    backgroundColor: 'white',
    borderRadius: 100,
    flexDirection: 'row',
    marginTop: 25,
    marginLeft: 38,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    elevation: 5,
    shadowOpacity: 0.16,
    shadowRadius: 10,
  },
  image4: {
    width: 40,
    height: 46,
    marginTop: 12,
  },
  helpAndSupport: {
    fontFamily: '',
    color: '#121212',
    marginLeft: 12,
    marginTop: 22,
    fontSize: 16,
  },
  image7: {
    width: 29,
    height: 58,
    marginLeft: 58,
  },
  image4Row: {
    height: 58,
    flexDirection: 'row',
    flex: 1,
    marginRight: 23,
    marginLeft: 24,
    marginTop: 10,
  },
  rect4: {
    width: 294,
    height: 78,
    backgroundColor: 'white',
    borderRadius: 100,
    flexDirection: 'row',
    marginTop: 26,
    marginLeft: 36,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    elevation: 5,
    shadowOpacity: 0.16,
    shadowRadius: 10,
  },
  image3: {
    width: 40,
    height: 46,
    marginTop: 6,
  },
  logout: {
    fontFamily: '',
    color: '#121212',
    marginLeft: 14,
    marginTop: 20,
    fontSize: 16,
  },
  image8: {
    width: 29,
    height: 58,
    marginLeft: 60,
  },
  image3Row: {
    height: 58,
    flexDirection: 'row',
    flex: 1,
    marginRight: 21,
    marginLeft: 26,
    marginTop: 10,
  },
  image9Stack: {
    width: 416,
    height: 745,
    marginTop: -74,
    marginLeft: -23,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButton: {
    fontSize: 16,
    color: "green",
    marginBottom: 20,
  },
  modalButtonRed: {
    fontSize: 16,
    color: "red",
  },
});
export default ProfileScreen;
