import React, { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Modal,
  Button,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Import FontAwesome for the tick icon

const ImageScreen = () => {
  const [image, setImage] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const openCamera = async () => {
    const result = await ImagePicker.requestCameraPermissionsAsync();
  
    if (result.granted === false) {
      alert("Kindly allow this app to access your camera!");
    } else {
      const result = await ImagePicker.launchCameraAsync({
      //allowsEditing: true,
      base64: true,
      aspect: [4, 3],
      quality: 1,


      });
  
      if (!result.canceled) {
        setImage(result.assets[0].uri); 
      }
      return result;
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); 
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <ImageBackground
      source={require("../assets/Background.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={openCamera}>
          <Text style={styles.detectButtonText}>Open Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.detectButtonText}>Open Gallery</Text>
        </TouchableOpacity>

        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Image source={require("../assets/Tomato-late-blight-72605cba08f2483aae0fd8f1dc3532a9.jpg")} style={styles.image} />
        )
        }

        <TouchableOpacity style={styles.detectButton} onPress={toggleModal}>
          <Text style={styles.detectButtonText}>Detect</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalTitleContainer}>
              <View style={styles.iconContainer}>
                <FontAwesome name="check" size={24} color="white" />
              </View>
                <Text style={styles.modalTitle}>Disease</Text>
              
              </View>
              <Text style={styles.modalText}>
                This is the description of the disease.This is the description of the disease.
                This is the description of the disease.This is the description of the disease.
              </Text>
              <TouchableOpacity
                style={styles.closeButtonContainer}
                onPress={toggleModal}
              >
                <Text style={styles.closeButtonText}>Got It</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "#3498db",
    width: 250,
    padding: 10,
    marginBottom: 30,
    alignItems: "center",
  },
  image: {
    width: 400,
    height: "40%",
    borderRadius: 10,
    marginVertical: 20,
  },
  detectButton: {
    backgroundColor: "#3498db",
    marginTop: 40,
    padding: 10,
    width: 250,
    borderRadius: 5,
  },
  detectButtonText: {
    color: "white",
    alignSelf: "center",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    height: '30%',
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    padding: 10,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignSelf: "center",
    marginTop: -40,
    marginBottom: 40, 
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  closeButtonContainer: {
    marginTop:10,
    borderRadius: 50,
    backgroundColor: "green",
    
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
});


export default ImageScreen;
