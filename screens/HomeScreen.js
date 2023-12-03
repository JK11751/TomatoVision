import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import firebase from "firebase/compat/app";
import { Ionicons } from "@expo/vector-icons";
import "firebase/compat/auth";

const Home = () => {
  const [name, setName] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=-1.102554&lon=37.013193&units=metric&APPID=24b76c18df66291f4ebcea2c1b7f414b`
      )
        .then((res) => res.json())
        .then((json) => {
          setData(json);
         // console.log(json);
        });
    };
    fetchData();
  }, []);

  useEffect(() => {
    const user = firebase.auth().currentUser;

    if (user) {
      const displayName = user.displayName;
      if (displayName) {
        setName(displayName);
      }
    }
  }, []);

  const navigation = useNavigation();
  return (
    <ImageBackground
      source={require("../assets/Background.png")}
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <View style={styles.container}>
        <View style={styles.rect2StackStack}>
          <View style={styles.rect2Stack}>
            <Image
              source={require("../assets/images/blob1.png")}
              resizeMode="cover"
              style={styles.rect2}
            ></Image>
            <View style={styles.rect}>
              <View>
                <Text style={styles.loremIpsum}>
                  Hi! <Text style={styles.highlightedName}>{name}</Text> Welcome
                  to TomatoVision
                </Text>
              </View>
              <View style={styles.rect4}>
                <Text style={styles.healYourCrop}>Protect Your Crop!</Text>
                <View style={styles.image3Row}>
                  <Image
                    source={require("../assets/images/qr.png")}
                    resizeMode="contain"
                    style={styles.image3}
                  ></Image>
                  <Image
                    source={require("../assets/images/next.png")}
                    resizeMode="contain"
                    style={styles.image6}
                  ></Image>
                  <Image
                    source={require("../assets/images/paper.png")}
                    resizeMode="contain"
                    style={styles.image4}
                  ></Image>
                  <Image
                    source={require("../assets/images/next.png")}
                    resizeMode="contain"
                    style={styles.image7}
                  ></Image>
                  <Image
                    source={require("../assets/images/healthcare-and-medical.png")}
                    resizeMode="contain"
                    style={styles.image5}
                  ></Image>
                </View>
                <TouchableOpacity
                  style={styles.floatBtn}
                  onPress={() => navigation.navigate("CameraScreen")}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Ionicons name={"md-camera"} size={25} color={"white"} />
                    <Text style={styles.floatTxt}>Take a picture</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.rect7}>
                <View style={styles.today14JulColumnRow}>
                  <View style={styles.today14JulColumn}>
                    <Text style={styles.today14Jul}>
                      Temp:{data.main?.temp}°C
                    </Text>
                    <Text style={styles.today15}>
                      Wind Speed:{data.wind?.speed} m/s
                    </Text>
                  </View>
                </View>
                <Text style={styles.rainUntilAfternoon}>
                  Humidity:{data.main?.humidity}%
                </Text>
              </View>
            </View>
            <Image
              source={require("../assets/seedling-2163773_1280.webp")}
              resizeMode="contain"
              style={styles.image2}
            ></Image>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  highlightedName: {
    fontWeight: "bold",
    color: "green",
  },
  rect2: {
    top: -40,
    left: 110,
    height: 350,
    position: "absolute",
  },
  rect: {
    top: 100,
    width: 278,
    height: 513,
    position: "absolute",
    backgroundColor: "#ffffff",
    borderRadius: 35,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 7,
    shadowOpacity: 1,
    shadowRadius: 4,
    left: 28,
  },
  floatTxt: { top: 3, left: 4, color: "white", fontFamily: "" },
  floatBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: 140,
    position: "absolute",
    top: 120,
    left: 35,
    height: 45,
    backgroundColor: "#195F57",
    borderRadius: 27,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    elevation: 7,
    shadowOpacity: 0.16,
    shadowRadius: 10,
  },
  loremIpsum: {
    fontFamily: "",
    color: "#195F57",
    fontSize: 20,
    marginTop: 19,
    marginLeft: 24,
  },
  rect4: {
    width: 238,
    height: 176,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 27,
    marginTop: 30,
    marginLeft: 20,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    elevation: 5,
    shadowOpacity: 0.16,
    shadowRadius: 10,
  },
  healYourCrop: {
    fontFamily: "",
    color: "#195F57",
    fontSize: 18,
    marginTop: 14,
    marginLeft: 21,
  },
  image3: {
    width: 38,
    height: 39,
    marginTop: 11,
  },
  image6: {
    width: 16,
    height: 34,
    marginLeft: 12,
    marginTop: 14,
  },
  image4: {
    width: 48,
    height: 48,
    marginLeft: 7,
    marginTop: 3,
  },
  image7: {
    width: 16,
    height: 34,
    marginLeft: 1,
    marginTop: 13,
  },
  image5: {
    width: 47,
    height: 53,
    marginLeft: 2,
  },
  image3Row: {
    height: 53,
    flexDirection: "row",
    marginTop: 27,
    marginLeft: 31,
    marginRight: 20,
  },
  rect6: {
    width: 238,
    height: 85,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 27,
    marginTop: 19,
    marginLeft: 22,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    elevation: 5,
    shadowOpacity: 0.16,
    shadowRadius: 10,
  },
  previousPictures: {
    fontFamily: "",
    color: "#195F57",
    fontSize: 14,
    marginTop: 9,
    marginLeft: 14,
  },
  rect8: {
    width: 35,
    height: 36,
    backgroundColor: "#E6E6E6",
    borderRadius: 5,
  },
  rect10: {
    width: 35,
    height: 36,
    backgroundColor: "#E6E6E6",
    borderRadius: 5,
    marginLeft: 21,
  },
  rect9: {
    width: 35,
    height: 36,
    backgroundColor: "#E6E6E6",
    borderRadius: 5,
    marginLeft: 23,
  },
  rect11: {
    width: 35,
    height: 36,
    backgroundColor: "#E6E6E6",
    borderRadius: 5,
  },
  rect8Row: {
    height: 36,
    flexDirection: "row",
    marginTop: 8,
    marginLeft: 17,
    marginRight: 14,
  },
  rect7: {
    width: 238,
    height: 156,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 27,
    marginTop: 40,
    marginLeft: 22,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    elevation: 5,
    shadowOpacity: 0.16,
    shadowRadius: 10,
  },
  today14Jul: {
   
    color: "#195F57",
    fontSize: 18,
  },
  today15: {
 
    color: "#195F57",
    fontSize: 16,
    marginTop: 6,
  },
  sunset632Pm: {
  
    color: "#195F57",
    fontSize: 18,
    marginTop: 3,
    marginLeft: 1,
    width: 120,
  },
  today14JulColumn: {
    width: 154,
    fontSize: 18,
    marginTop: 2,
  },
  image9: {
    width: 78,
    height: 71,
    marginLeft: 46,
  },
  today14JulColumnRow: {
    height: 72,
    flexDirection: "row",
    marginTop: 14,
    marginLeft: 14,
    marginRight: 16,
  },
  rainUntilAfternoon: {
   
    color: "#195F57",
    fontSize: 18,
    marginTop: 18,
    marginLeft: 15,
  },
  image2: {
    top: 492,
    left: 270,
    width: 131,
    height: 155,
    position: "absolute",
  },
  sunset633: {
    top: 178,
    left: 64,
    position: "absolute",
    
    color: "#121212",
    fontSize: 13,
  },
  image10: {
    top: 20,
    bottom: 20,
    left: -5,
    width: 120,
    height: 35,
    position: "absolute",
  },
  rect2Stack: {
    top: 0,
    left: 57,
    width: 402,
    height: 647,
    position: "absolute",
  },
  rect3: {
    top: 447,
    left: 0,
    width: 273,
    height: 245,
    position: "absolute",
  },
  rect2StackStack: {
    width: 459,
    height: 692,
    marginLeft: -50,
  },
});

export default Home;
