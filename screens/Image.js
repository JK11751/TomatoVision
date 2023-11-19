import React, { useState } from "react";
import Toast from "react-native-root-toast";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
  Modal,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
//import Config from "react-native-config";

axios.interceptors.request.use(
  async (config) => {
    let request = config;
    request.headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    request.url = configureUrl(config.url);
    return request;
  },
  (error) => error
);

export const configureUrl = (url) => {
  let authUrl = url;
  if (url && url[url.length - 1] === "/") {
    authUrl = url.substring(0, url.length - 1);
  }
  return authUrl;
};

const options = {
  mediaType: "photo",
  quality: 1,
  width: 256,
  height: 256,
  includeBase64: true,
};

const ImageScreen = () => {
  const [result, setResult] = useState("");
  const [label, setLabel] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const openCamera = async () => {
    const result = await ImagePicker.requestCameraPermissionsAsync(options);
    if (result.granted === false) {
      alert("Kindly allow this app to access your camera!");
    } else {
      const response = await ImagePicker.launchCameraAsync(options);

      if (!response.canceled) {
        const uri = response.assets[0].uri;
        console.log(uri);
        const path = Platform.OS !== "ios" ? uri : "file://" + uri;
        getResult(path, response);
      } else {
        Toast.show("Camera operation cancelled or encountered an error:", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
        });
      }
    }
  };

  const pickImage = async () => {
    let response = await ImagePicker.launchImageLibraryAsync(options);
    if (!response.canceled) {
      const uri = response.assets[0].uri;
      console.log(uri);
      const path = Platform.OS !== "ios" ? uri : "file://" + uri;
      getResult(path, response);
      console.log(getResult);
    } else {
      Toast.show("Image Selection cancelled or encountered an error:", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
      });
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const getResult = async (path, response) => {
    setImage(path);
    setLabel("Predicting please wait...");
    setResult("");
    setLoading(true);
    const params = {
      uri: path,
      name: response.assets[0].fileName,
      type: response.assets[0].type,
    };

    try {
      const res = await getPredication(params);
      if (res?.data?.class) {
        setLabel(res.data.class);
        setResult(res.data.confidence);
      } else {
        setLabel("Failed to predict");
        setResult("No Value");
      }
    } catch (error) {
      console.error("Error predicting image:", error);
      setLabel("Failed to predict");
      setResult("No Value");
    } finally {
      setLoading(false);
      toggleModal;
    }
  };

  const getPredication = async (params) => {
    return new Promise((resolve, reject) => {
      var bodyFormData = new FormData();
      bodyFormData.append("file", params);
      const url =
        "http://ec2-34-228-195-240.compute-1.amazonaws.com/api/predict";
      console.log(url);
      axios
        .post(url, bodyFormData)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          setLabel("Failed to predict.");
          reject("err", error);
        });
    });
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
        {image.length ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Image
            source={require("../assets/Tomato-late-blight-72605cba08f2483aae0fd8f1dc3532a9.jpg")}
            style={styles.image}
          />
        )}
          <TouchableOpacity style={styles.detectButton} onPress={getResult}>
          {!isLoading ? (
            <Text style={styles.detectButtonText}>Detect</Text>
          ) : (
            <ActivityIndicator size="small" color="#fff" />
          )}
  
        </TouchableOpacity>
        {result && label && (
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
                  <Text style={styles.modalTitle}> {label} </Text>
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
        )}
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
    marginTop: 6,
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
    height: 140,
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
  modalTitle1: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
    alignSelf: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default ImageScreen;
