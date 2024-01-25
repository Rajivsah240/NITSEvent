import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {React,useEffect,useState} from "react";
import * as Font from "expo-font";

const LoginSignUp = ({ navigation }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const handleStudentSignin = () => {
    navigation.replace("LoginScreen");
  };

  const handleClubSignin = () => {
    navigation.navigate("ClubLogin");
  };

  let customFonts = {
    Convergence: require("../assets/fonts/Convergence-Regular.ttf"),
    Monoton: require("../assets/fonts/Monoton-Regular.ttf"),
    Teko: require("../assets/fonts/Teko-VariableFont_wght.ttf"),
    TekoSemiBold: require("../assets/fonts/Teko-SemiBold.ttf"),
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
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:"center",
    justifyContent:'center',
    backgroundColor:'#102733'

  },
  headerContainer:{
    alignItems:'center',
    paddingVertical:10,
    
  },
  btnContainer: {
    flexDirection:'row',
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize:35,
    fontFamily:'TekoSemiBold',
    color:'#A9B2B6'
  },
  accountTxt:{
    fontFamily:"Convergence",
    color:'#A9B2B6'
  },
  button: {
    backgroundColor: "#FCCD00",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    
  },
  buttonText: {
    color:'#5D6D78',
    fontSize: 18,
    textAlign: "center",
    fontFamily:'Convergence'
  },
});

export default LoginSignUp;
