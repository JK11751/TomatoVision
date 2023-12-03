import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  Dimensions,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { nameValidator } from "../helpers/nameValidator";
import Toast from "react-native-root-toast";
import { signUpUser } from "../api/auth-api";

const {width} = Dimensions.get('window');
const inputFieldWidth = width * 0.8;
const SignUp = () => {
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState();

  const navigation = useNavigation();

  const showToast = (message, backgroundColor) => {
    Toast.show(message, {
      duration: Toast.durations.LONG,
      position: Toast.positions.TOP,
      backgroundColor,
    });
  };



  const onSignUpPressed = async () => {
    const nameError = nameValidator(name.value);

    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    setLoading(true);

    const response = await signUpUser({
      name: name.value,
      email: email.value,
      password: password.value,
    });
  
    if (response.success) {
      showToast('Registration Successful. Check your email for verification link', 'green');
      navigation.navigate("Login");
    } else {
      if (response.error === 'network') {
        showToast('Registration request failed due to a network issue. Please check your connection and try again.', 'red');
      } else if (response.error === 'email-in-use') {
        showToast('Registration request failed. Email already in use', 'red');
      }
    }
  
    setLoading(false);
  };

  

  return (
    <ImageBackground
      source={require("../assets/Background.png")}
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
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

        <KeyboardAvoidingView>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                marginTop: 12,
                color: "#041E42",
              }}
            >
              Create your Account
            </Text>
            </View>
            {/* Name Input */}
        <View style={{ marginTop: 20 ,paddingHorizontal:30}}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#D0D0D0",
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 30,
              }}
             >
              <Ionicons
                name="ios-person"
                size={24}
                color="gray"
                style={{ marginLeft: 8 }}
              />
              <TextInput
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: inputFieldWidth,
                  fontSize: 16,
                }}
                placeholder="enter your name"
                returnKeyType="next"
                value={name.value}
                onChangeText={(text) => setName({ value: text, error: "" })}
                error={!!name.error}
                errorText={name.error}
              />
             </View>
             {name.error ? (
              <Text style={{ color: "red" }}>{name.error}</Text>
             ) : null}

             {/* Email Input */}
             <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#D0D0D0",
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 30,
              }}
             >
              <MaterialIcons
                style={{ marginLeft: 8 }}
                name="email"
                size={24}
                color="gray"
              />

              <TextInput
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: inputFieldWidth,
                  fontSize: 16,
                }}
                returnKeyType="next"
                value={email.value}
                onChangeText={(text) => setEmail({ value: text, error: "" })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
                placeholder="enter your Email"
              />
              </View>
              {email.error ? (
              <Text style={{ color: "red" }}>{email.error}</Text>
              ) : null}
              {/* Password Input */}

                   <View
                style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#D0D0D0",
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 30,
              }}
              >
              <AntDesign
                name="lock1"
                size={24}
                color="gray"
                style={{ marginLeft: 8 }}
              />

              <TextInput
               id="passwordInput" 
                secureTextEntry={true}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: inputFieldWidth,
                  fontSize: 16,
                }}
                returnKeyType="done"
                value={password.value}
                onChangeText={(text) => setPassword({ value: text, error: "" })}
                error={!!password.error}
                errorText={password.error}
                placeholder="enter your Password"
              />
              </View>
              {password.error ? (
              <Text style={{ color: "red" }}>{password.error}</Text>
               ) : null}










              
               </View>

          
              
              
              

            <View style={{ marginTop: 40 }} />

            <TouchableOpacity
            style={{
              width: width-20,
              backgroundColor: "green",
              borderRadius: 6,
              marginLeft: "auto",
              marginRight: "auto",
              padding: 15,
              }}
             onPress={onSignUpPressed}
              >
              {!loading ? (
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                SignUp
              </Text>
              ) : (
              <ActivityIndicator size="small" color="#fff" />
              )}
              </TouchableOpacity>

              <View style={{ flexDirection: "row", marginTop: 15,justifyContent:'center' }}>
              <Text
              style={{
                textAlign: "center",
                color: "gray",
                fontSize: 16,
             
               }}
              >
              Already have an account?{" "}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={{ fontWeight: "bold", color: "green" }}>Login</Text>
              </TouchableOpacity>
            </View>
                </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default SignUp;
