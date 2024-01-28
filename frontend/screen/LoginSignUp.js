import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { React, useEffect, useState } from "react";
import * as Font from "expo-font";
import { customFonts } from "../Theme";
const LoginSignUp = ({ navigation }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const handleStudentSignin = () => {
    navigation.replace("LoginScreen");
  };

  const handleClubSignin = () => {
    navigation.navigate("ClubLogin");
  };


  const loadFontsAsync = async () => {
    await Font.loadAsync(customFonts);
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFontsAsync();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground
      style={[styles.container, styles.backgroundImg]}
      source={require("../assets/images/LoginSignin.jpg")}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Welcome to Nits Event!</Text>
        <Text style={styles.accountTxt}>Choose Your Account</Text>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={handleClubSignin} style={styles.button}>
          <Text style={styles.buttonText}>Club Secretary</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleStudentSignin} style={styles.button}>
          <Text style={styles.buttonText}>Student</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:'#fff'
  },
  backgroundImg: {
    height: "50%",
    
  },
  headerContainer: {
    alignItems: "center",
    paddingVertical: 10,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 35,
    fontFamily: "TekoSemiBold",
    color: "#000000",
  },
  accountTxt: {
    fontFamily: "Convergence",
    color: "#A9B2B6",
  },
  button: {
    backgroundColor: "#F1F0F9",
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: "#000000",
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Convergence",
  },
});

export default LoginSignUp;
