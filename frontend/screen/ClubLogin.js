import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { FIREBASE_AUTH } from "../config/firebase";
const ClubLogin = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      // Validate email and password
      if (!email || !password) {
        throw new Error("Please enter both email and password.");
      }

      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);

      // Navigate to the ClubHomeScreen on successful login
      navigation.navigate("ClubHomeScreen");

    } catch (error) {
      Alert.alert("Login Failed", error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/icons/logo.png")}
        />
        <Text style={styles.title}>Account Login</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          keyboardType="email-address"
        />
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            secureTextEntry={!showPassword}
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={togglePasswordVisibility}
          >
            <Feather
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="#3498db"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.googleButton} onPress={() => {}}>
          <AntDesign  name="google" size={24} color="#dd4b39" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("ClubSignUpScreen")}>
          <Text style={{color:'#71bbde'}}>New Here? Click Here to Sign Up First.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    height: 100,
    width: 100,
  },
  title: {
    fontSize: 24,
    marginTop: 10,
  },
  formContainer: {
    marginTop: 20,
    alignItems:'center'
  },
  input: {
    width:'100%',
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 20,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 20,
  },
  toggleButton: {
    marginLeft: -25,
    top: -10,
    left: -10
  },
  loginButton: {
    backgroundColor: "#f4f5ff",
    padding: 10,
    width:"50%",
    borderRadius: 20,
    alignItems: "center",
    justifyContent:'center',
    marginBottom: 10,
  },
  googleButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
  },
});

export default ClubLogin;
