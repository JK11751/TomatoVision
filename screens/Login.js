import {
  StyleSheet,
  Alert,
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
import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { loginUser } from "../api/auth-api";

const screenWidth = Dimensions.get("window").width;

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 

  const onLoginPressed = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    setLoading(true);
    setError(null)
    const response = await loginUser({
      email: email.value,
      password: password.value,
    });
    setLoading(false); 
  
    if (response.success) {
      if (response.user.emailVerified) {
        Alert.alert("Login Successful");
        navigation.navigate("DashBoard");
      } else {
        Alert.alert(
          "Email not verified",
          "Please check your email for verification."
        );
      }
    } else {
      setError("Wrong Password or Email");
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
          {/*
          {error ? (
      <Text style={{ color: "red", textAlign: "center", marginTop: 10 }}>
        {error}
      </Text>
    ) : null}
          */}
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
                  width: 300,
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
                  width: 300,
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
            onPress={onLoginPressed}
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
