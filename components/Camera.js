import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';



const Camera = () => {


  return (
    <View style={styles.rect5Stack}>

      <TouchableOpacity
        style={styles.rect5}
        onPress={() => navigation.navigate('CameraScreen')}
      >
        <Text style={styles.takeAPicture}>Take a Picture</Text>
      </TouchableOpacity>

      <Image
        source={require('../assets/images/photography.png')}
        resizeMode='contain'
        style={styles.image8}
      ></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  rect5Stack: {
    width: 201,
    height: 44,
    marginTop: 9,
    marginLeft: 19
  },
  rect5: {
    top: 1,
    left: 0,
    width: 201,
    height: 43,
    position: 'absolute',
    backgroundColor: '#195F57',
    borderRadius: 56
  },
  takeAPicture: {
    fontFamily: 'comicneuebold',
    color: 'rgba(255,255,255,1)',
    fontSize: 14,
    marginTop: 13,
    marginLeft: 84
  },
  image8: {
    top: 0,
    left: 25,
    width: 35,
    height: 42,
    position: 'absolute'
  },
  modalView: {
    width: 239,
    height: 157,
    backgroundColor: 'white',
    borderRadius: 17,

    alignSelf: 'center'
  },
  modalHeader: {
    fontFamily: 'comicneuebold',
    color: '#121212',
    fontSize: 18,
    marginTop: 12,
    marginLeft: 14
  },
  modalBody: {
    height: 30,
    flexDirection: 'row',
    marginTop: 21,
    marginLeft: 55,
    marginRight: 54
  },
  modalImage1: {
    width: 50,
    height: 50,
    bottom: 9,
    right: 10
  },
  modalImage2: {
    width: 50,
    height: 50,
    marginLeft: 40,
    bottom: 10
  },
  cameraRow: {
    height: 17,
    flexDirection: 'row',
    marginTop: 7,
    marginLeft: 45,
    marginRight: 48
  },
  camera: {
    fontFamily: 'comicneueregular',
    color: '#121212',
    top: 5,
    left: 2
  },
  gallery: {
    fontFamily: 'comicneueregular',
    color: '#121212',
    marginLeft: 59,
    top: 5
  },
  modalCancel: {
    fontFamily: 'comicneuebold',
    color: 'red',
    marginTop: 20,
    marginLeft: 180
  }
});

export default Camera;
