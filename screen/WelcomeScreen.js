import React, { useEffect,useState } from "react";
import { View, Text, StyleSheet, ImageBackground, Image } from "react-native";
import * as Font from 'expo-font';
import { StatusBar } from "expo-status-bar";


const WelcomeScreen = ({ navigation }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  let customFonts = {
    Convergence: require("../assets/fonts/Convergence-Regular.ttf"),
    Monoton: require("../assets/fonts/Monoton-Regular.ttf"),
  };
  const loadFontsAsync = async () => {
    await Font.loadAsync(customFonts);
    setFontsLoaded(true);
  };


  useEffect(() => {
    loadFontsAsync();
    const timeout = setTimeout(() => {
      navigation.replace("Tab");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [navigation]);


  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground
      source={require("../assets/images/welcomePage.png")}
      style={styles.container}
    >
      <Image style={styles.logo} source={require("../assets/icons/logo.png")} />
      <Text style={styles.headText}>NITS Event</Text>
      <StatusBar backgroundColor="#960e05" />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    paddingTop:250,
    alignItems: "center",
    resizeMode: "cover",
  },
  logo: {
    height: 100,
    width: 100,
  },
  headText: {
    fontSize: 30,
    color: "#ffffff",
    fontFamily:'Monoton'
  },
});

export default WelcomeScreen;
