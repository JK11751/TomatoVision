import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
} from 'react-native';
import { useRoute } from "@react-navigation/native";

const deviceHeight = Dimensions.get('window').height;
const DiseaseDetailedScreen = () => {


  const route = useRoute(); // Get the route object to access params
  const { disease } = route.params; // Access the passed disease data

  return (
    <View style={styles.container}>
      <View style={styles.imageStack}>
        <Image
          source={require('../assets/images/example_plant.jpg')}
          resizeMode='contain'
          style={styles.image}
        ></Image>
        <View style={styles.rect}>
          <View style={styles.amarylissPotatoColumnRow}>
            <View style={styles.amarylissPotatoColumn}>
              <Text style={styles.amarylissPotato}>{disease.name}</Text>
            </View>
            <Image
              source={require('../assets/images/green.png')}
              resizeMode='contain'
              style={styles.image2}
            ></Image>
          </View>
          <View style={styles.rect3}>
            <Text style={styles.loremIpsum2}>What is it ?</Text>
            <Text style={styles.loremIpsum1}>
              {disease.description}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    top: 0,
    width: 482,
    height: 315,
    position: 'absolute',
    left: 0
  },
  rect: {
    top: 249,
    left: 61,
    width: 360,
    height: 469,
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 27
  },
  amarylissPotato: {
    color: '#121212',
    fontSize: 20,
    marginLeft: 2
  },
  floatTxt: { top: 3, left: 4, color: 'white' },
  floatBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 140,
    position: 'absolute',
    bottom: 20,
    right: 15,
    height: 45,
    backgroundColor: '#195F57',
    borderRadius: 27,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 1,
      height: 1
    },
    elevation: 7,
    shadowOpacity: 0.16,
    shadowRadius: 10
  },
  image3: {
    width: 21,
    height: 15,
    marginTop: 1
  },
  maimoSweden: {
    fontFamily: '',
    color: '#121212',
    marginLeft: 3
  },
  image3Row: {
    height: 17,
    flexDirection: 'row',
    marginTop: 9,
    marginRight: 35
  },
  amarylissPotatoColumn: {
    width: 200
  },
  image2: {
    width: 59,
    height: 46,
    marginLeft: 80
  },
  amarylissPotatoColumnRow: {
    height: 54,
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 16,
    marginRight: 15
  },
  rect2: {
    width: 326,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 16,
    flexDirection: 'row',
    marginTop: 13,
    marginLeft: 18,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 1,
      height: 1
    },
    elevation: 5,
    shadowOpacity: 0.16,
    shadowRadius: 10
  },
  image4: {
    width: 20,
    height: 20
  },
  needSunlight: {
    fontFamily: '',
    color: '#121212',
    marginLeft: 7,
    marginTop: 2
  },
  image5: {
    width: 25,
    height: 20,
    marginLeft: 69
  },
  waterWeekly: {
    color: '#121212',
    marginLeft: 2,
    marginTop: 2
  },
  image4Row: {
    height: 20,
    flexDirection: 'row',
    flex: 1,
    marginRight: 20,
    marginLeft: 12,
    marginTop: 15
  },
  rect3: {
    width: 326,
    height: 370,
    backgroundColor: 'white',
    borderRadius: 12,
    marginTop: 10,
    marginLeft: 18,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 1,
      height: 1
    },
    elevation: 5,
    shadowOpacity: 0.16,
    shadowRadius: 10
  },
  loremIpsum1: {
    color: '#121212',
    width: 315,
    height: 300,
    fontSize:18,
    textAlign: 'justify',
    marginTop: 30,
    marginLeft: 6
  },
  loremIpsum2: {
   fontWeight: 'bold',
    color: 'black',
    textAlign: 'justify',
    fontSize: 20,
    top: 5,
    marginLeft: 15
  },
  imageStack: {
    width: 482,
    height: deviceHeight,
  }
});

export default DiseaseDetailedScreen;
