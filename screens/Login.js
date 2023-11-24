import {
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Pressable,
} from "react-native";
import Toast from 'react-native-root-toast';
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { loginUser } from "../api/auth-api";

const screenWidth = Dimensions.get('window').width;
const inputFieldWidth = screenWidth * 0.4;

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState(false);


  const onLoginPressed = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
  
    setLoading(true);
  
    const response = await loginUser({
      email: email.value,
      password: password.value,
    });
  
    setLoading(false);
  
    if (response.error) {
      Toast.show('Login Failed. Check your network connectivity.', {
        duration: Toast.durations.LONG,
        position:Toast.positions.TOP,

      });
    } else {
      // Check if the user's email is verified
      if (response.user.emailVerified) {
        Toast.show('Login Successful.', {
          duration: Toast.durations.LONG,
          position:Toast.positions.TOP,
         
        });
        navigation.navigate("DashBoard");
      } else {
        Toast.show('Incorrect Login Credentials', {
          duration: Toast.durations.LONG,
        });
      }
    }
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
              LogIn to your Account
            </Text>
          </View>
          <View style={{ marginTop: 70 }}>
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
            {email.error ? <Text style={{ color: 'red' }}>{email.error}</Text> : null}
          </View>

          <View style={{ marginTop: 10 }}>
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
                secureTextEntry={true}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: inputFieldWidth,
                  fontSize: 16,
                }}
                placeholder="enter your Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={(text) => setPassword({ value: text, error: "" })}
                error={!!password.error}
                errorText={password.error}
              />
            </View>
            {password.error ? <Text style={{ color: 'red' }}>{password.error}</Text> : null}
          </View>

          <View
            style={{
              marginTop: 12,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text>Keep me logged in</Text>

            <Text style={{ color: "#007FFF", fontWeight: "500" }}>
              Forgot Password
            </Text>
          </View>

          <View style={{ marginTop: 40 }} />

          <Pressable
            style={{
              width: 400,
              backgroundColor: "green",
              borderRadius: 6,
              marginLeft: "auto",
              marginRight: "auto",
              padding: 15,
            }}
            loading={loading}
            mode="contained"
            onPress={() => navigation.navigate("DashBoard")}
           >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              SignIn
            </Text>
          </Pressable>
          <View style={{ flexDirection: "row", marginTop: 15 }}>
            <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
              Don’t have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={{ fontWeight: "bold", color: "#121330"}}>
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Login;
