import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons'; 
import { Foundation } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
const Home = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.redView}>
        <View style={styles.innerView}>
          <View>
            <Image source={require('../assets/Tomato-late-blight-72605cba08f2483aae0fd8f1dc3532a9.jpg')} style={styles.image} />
            <Text style={styles.text}>Pests</Text>
          </View>
        </View>
      </View>
      <View style={{marginLeft: 20,marginTop:20, marginBottom: 10, alignItems: "flex-start" }}>
      <Text style={{ fontSize: 24, color: 'black', fontWeight: 'bold' }}>Protect your crop</Text>
      <Text style={{ fontSize: 14, color: 'black', fontWeight: 'normal' }}>Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur   </Text>
      </View>

      <View style={styles.bottomView}>
        <View style={styles.textView}>
          <View style={styles.imageTextItem}>
            <Entypo name="camera" size={24} color="black" />
            <Text style={styles.smallText}>Take in picture</Text>
          </View>
          <View style={styles.imageTextItem}>
            <FontAwesome name="mobile-phone" size={24} color="black"  />
            <Text style={styles.smallText}>Get the output</Text>
          </View>
          <View style={styles.imageTextItem}>
            <Foundation name="results" size={24} color="black" />
            <Text style={styles.smallText}>Get diagnosis</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.takePictureButton}
         onPress={() => navigation.navigate('CameraScreen')}>
          <Text style={styles.buttonText}>Take Picture</Text>
        </TouchableOpacity>
      </View>
      <View style={{marginLeft: 20, marginTop: 10,marginBottom:10 }}>
      <Text style={styles.weatherText}>Weather</Text>
      </View>
      <View style={styles.weatherView}>
        {/*
        <Text style={styles.weatherField}>Temperature: 25°C</Text>
        <Text style={styles.weatherField}>Humidity: 50%</Text>
        <Text style={styles.weatherField}>Wind Speed: 10 mph</Text>
  */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  redView: {
    height: '20%', 
    backgroundColor: 'green',
    alignItems: 'flex-start', 
    justifyContent: 'center',
  },
  innerView: {
    backgroundColor: 'white',
    width: '50%',
    marginLeft: 10,
    borderRadius: 20,
    padding: 8,
    alignItems: 'flex-start', 
    justifyContent: 'center',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  text: {
    marginTop: 10,
    
    textAlign: 'center',
  },
  bottomView: {
    flexDirection: 'column',
    alignItems: 'center', 
    height: '35%', 
    marginTop: 20, 
    alignSelf: 'center',
    width: '95%',
    borderRadius: 15,
    backgroundColor: 'white',
    elevation: 2,
  },
  textView: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
  },
  imageTextItem: {
    alignItems: 'center',
    marginRight: 30, 
    width: 100,
  },
  smallImage: {
    width: 80,
    height: 80,
  },
  smallText: {
    marginTop: 5,
    flexWrap: 'wrap',
    textAlign: 'center',
    fontSize: 20,
  },
  takePictureButton: {
    backgroundColor: '#3498db',
    width: '90%',
    height: 60,
    padding: 20,
    borderRadius: 40,
    marginTop: 20, // Add top margin
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  weatherView: {
    alignSelf: "center",
    marginTop: 5,
    elevation: 2,
    borderRadius: 15,
    width: '95%',
    height: "30%",
    backgroundColor: 'white',
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'flex-start',
  },
  weatherText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  weatherField: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default Home;
