import React, { useState, useEffect } from "react";
import Toast from 'react-native-root-toast';
import * as ImagePicker from "expo-image-picker";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
  Modal,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as tf from "@tensorflow/tfjs";
import { bundleResourceIO } from "@tensorflow/tfjs-react-native";
import * as jpeg from "jpeg-js";

const ImageScreen = () => {
  const labels = [
    "Tomato_Early_blight",
    "Tomato_Late_blight",
    "Tomato_Septoria_leaf_spot",
    "Tomato_Tomato_Yellow_Leaf_Curl_Virus",
    "Tomato_healthy",
  ];
  const [image, setImage] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [model, setModel] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setLoading] = useState(false);

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

      if (!result.canceled && result.uri) {
        // Image was taken successfully
        setImage(result.uri);
        setPrediction(null); // Reset the prediction state
      } else {
        // User canceled the camera operation or there was an error
        console.log(
          "Camera operation cancelled or encountered an error:",
          result
        );
      }
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
  useEffect(() => {
    (async () => {
      console.log("[+] Application started");
      try {
        await tf.ready(); // Make sure TensorFlow.js is ready
        console.log("[+] Loading  model");
        const modelJson = require("../assets/model/model.json");
        const modelWeight = require("../assets/model/group1-shard1.bin");
        const loadedModel = await tf.loadLayersModel(
          bundleResourceIO(modelJson, modelWeight)
        );
        setModel(loadedModel);
        console.log("[+] Model Loaded");
      } catch (error) {
        console.error("Error loading the model:", error.message);
      }
    })();
  }, []);

  // Define a function that will preprocess the image for the model
  const imageToTensor = (rawImageData) => {
    const TO_UINT8ARRAY = true;
    const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY);
    // Drop the alpha channel info for mobilenet
    const buffer = new Uint8Array(width * height * 3);
    let offset = 0; // offset into original data
    for (let i = 0; i < buffer.length; i += 3) {
      buffer[i] = data[offset];
      buffer[i + 1] = data[offset + 1];
      buffer[i + 2] = data[offset + 2];

      offset += 3;
    }

    // Create a tensor from the image data
    return tf.tensor3d(buffer, [height, width, 3]);
  };

  // Define a function that will make a prediction for the image
  const predictImage = async () => {
    setLoading(true);
    try {
      if (image) {
        const imageAssetPath = image.uri ? image.uri : image;
        const response = await fetch(imageAssetPath, {}, { isBinary: true });
        const rawImageData = await response.arrayBuffer();
        const imageTensor = imageToTensor(rawImageData);

        // Check if the model is not null before making predictions
        if (model) {
          const prediction = await model
            .predict(imageTensor.reshape([1, ...imageTensor.shape]))
            .data();
          const maxIndex = prediction.indexOf(Math.max(...prediction));
          const disease = labels[maxIndex];
          setPrediction(disease);
          toggleModal();
        } else {
          console.log("Model is null");
        }
      } else {
        Toast.show('No image selected. Take picture or select images from gallery.', {
          duration: Toast.durations.LONG,
          position:Toast.positions.TOP,
  
        });
      }
    } catch (error) {
    } finally {
      setLoading(false); // Set loading to false after prediction is done
    }
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
          <Image
            source={require("../assets/Tomato-late-blight-72605cba08f2483aae0fd8f1dc3532a9.jpg")}
            style={styles.image}
          />
        )}

        <TouchableOpacity style={styles.detectButton} onPress={predictImage}>
          {!isLoading ? (
            <Text style={styles.detectButtonText}>Detect</Text>
          ) : (
            <ActivityIndicator size="small" color="#fff" />
          )}
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
                <Text style={styles.modalTitle}> {prediction} </Text>
              </View>
              <TouchableOpacity
                style={styles.closeButtonContainer}
                onPress={toggleModal}
              >
                <Text style={styles.closeButtonText}>Got it</Text>
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
    height: 120,
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
    marginTop: 20,
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
