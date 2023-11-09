import React, { useState, useEffect } from "react";
import * as ImagePicker from 'expo-image-picker';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Modal,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons"; 
import * as tf from "@tensorflow/tfjs";
import { bundleResourceIO } from "@tensorflow/tfjs-react-native";

const ImageScreen = () => {
  const [image, setImage] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [diseaseResult, setDiseaseResult] = useState(null);
  const [leafDetector, setLeafDetector] = useState(null);

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
 

  useEffect(() => {
    async function loadModel() {
      console.log("[+] Application started")
      try {
        await tf.ready();
        console.log("[+] Loading custom mask detection model")
        const modelJson = require("../assets/model/model.json");
        const modelWeight = require("../assets/model/group1-shard.bin");
        const loadedModel = await tf.loadLayersModel(
          bundleResourceIO(modelJson, modelWeight)
        );
        console.log("[+] Loading pre-trained face detection model")
        setLeafDetector(loadedModel);
        console.log("[+] Model Loaded");
      } catch (error) {
        console.error("Error loading model:", error);
      }
    }
    loadModel();
  }, []);

  const getDisease = async () => {
    if (!leafDetector) {
      console.error("Model not loaded yet.");
      return;
    }

    if (!image) {
      console.error("No image selected.");
      return;
    }

    try {
      const response = await fetch(image);
      console.log("[+] Retrieving image from link :"+image)
      const rawImageData = await response.arrayBuffer();
      const imageTensor = preprocessImage(rawImageData);

      // Make predictions using your loaded model
      const predictions = await leafDetector.predict(imageTensor);

      // Interpret predictions and determine the disease class
      const diseaseClass = interpretPredictions(predictions);

      // Display the result to the user
      setDiseaseResult(diseaseClass);
      toggleModal();
    } catch (error) {
      console.error("Error loading image:", error);
    }
  };
  const preprocessImage = (rawImageData) => {
    const TO_UINT8ARRAY = true;
    const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY);
  
    // Resize the image to match the input size expected by your model
    const resizedImage = tf.image.resizeBilinear(
      tf.tensor3d(data, [height, width, 3]),
      [224, 224] // Adjust the dimensions as per your model's input requirements
    );
  
    // Normalize the pixel values to the [0, 1] range
    const normalizedImage = tf.div(resizedImage, 255.0);
  
    return normalizedImage;
  };
  

  const interpretPredictions = (predictions) => {
    const classLabels = ["Disease Class 1", "Disease Class 2", "Disease Class 3"]; // Replace with your actual class labels
  
    // Find the index of the class with the highest probability
    const argMaxIndex = tf.argMax(predictions).dataSync()[0];
  
    // Get the corresponding disease class label
    const detectedDisease = classLabels[argMaxIndex];
  
    return detectedDisease;
  };
  
  {/*
  function imageToTensor(rawImageData){
    //Function to convert jpeg image to tensors
    const TO_UINT8ARRAY = true;
    const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY);
    // Drop the alpha channel info for mobilenet
    const buffer = new Uint8Array(width * height * 3);
    let offset = 0; // offset into original data
    for (let i = 0; i < buffer.length; i += 3) {
      buffer[i] = data[offset];
      buffer[i + 1] = data[offset + 1];
      buffer[i + 2] = data[offset + 2];
      offset += 4;
    }
    return tf.tensor3d(buffer, [height, width, 3]);
  }
*/}
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

        <TouchableOpacity style={styles.detectButton}onPress={getDisease}>
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
                <Text style={styles.modalTitle}> {diseaseResult ? `Detected Disease: ${diseaseResult}` : "Detection in progress..."}</Text>
              
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
