import React from 'react'
import { View, Text, Image, SafeAreaView, ImageBackground, TextInput, Pressable } from 'react-native';

const Contact = () => {
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
      </SafeAreaView>
    </ImageBackground>
    )
  }
export default Contact