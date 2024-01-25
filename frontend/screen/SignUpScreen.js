import React, { useState,useEffect } from "react";
import {View,Text,TextInput,StyleSheet,Button,TouchableOpacity,Image,Alert} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {FIREBASE_AUTH, FIRESTORE_DB, FIREBASE_APP} from "../config/firebase";

import { getStorage, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { createUserWithEmailAndPassword,getAuth } from "firebase/auth";
import { doc,setDoc } from "firebase/firestore";
import * as Font from "expo-font";

const SignUpScreen = ({navigation}) => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setprofilePic] = useState("");
  

  const [imageURL, setImageURL] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  let customFonts = {
    Convergence: require("../assets/fonts/Convergence-Regular.ttf"),
    Monoton: require("../assets/fonts/Monoton-Regular.ttf"),
    Teko: require("../assets/fonts/Teko-VariableFont_wght.ttf"),
    TekoSemiBold: require("../assets/fonts/Teko-SemiBold.ttf"),
    TekoMedium: require("../assets/fonts/Teko-Medium.ttf"),
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

  const handleImageUpload = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        // aspect: [4, 3],
        quality: 1,
      });

      console.log("ImagePicker result:", result);

      if (!result.canceled) {
        setprofilePic(result.assets[0].uri);
        console.log("Image URI set:", result.uri);
      }
    } catch (error) {
      console.error("ImagePicker error:", error);
    }
  };

  const uploadImage = async () => {
    try {
      const response = await fetch(profilePic);
      const blob = await response.blob();

      const storage = getStorage(FIREBASE_APP);

      const uriComponents = profilePic.split("/");
      const imageName = uriComponents[uriComponents.length - 1];

      const storageRef = ref(storage, `StudentDP/${imageName}`);
      const snapshot = await uploadBytes(storageRef, blob);

      const url = await getDownloadURL(snapshot.ref);

      console.log("Download URL: ", url);
      setImageURL(url);
      setUploaded(true);
      console.log(imageURL);
    } catch (error) {
      console.error("upload error: ", error);
    }
  };

  const handleSignUp = async () => {
    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords don't match");
      }

      // Create a new user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );

      const user = userCredential.user;
      const userRef = doc(FIRESTORE_DB, "studentUsers", user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        name,
        email,
        imageURL,
      });

      console.log("SignUp successful!");
      navigation.navigate("LoginScreen");
    } catch (error) {
        Alert.alert(error.message);
      console.error("SignUp failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Sign Up</Text>
      <TextInput
        placeholder="Name"
        placeholderTextColor={"#A9B2B6"}
        onChangeText={setname}
        value={name}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        placeholderTextColor={"#A9B2B6"}
        onChangeText={setemail}
        value={email}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor={"#A9B2B6"}
        onChangeText={setPassword}
        value={password}
        style={styles.input}
        secureTextEntry
      />
      <TextInput
        placeholder="Confirm Password"
        placeholderTextColor={"#A9B2B6"}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        style={styles.input}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.imageUploadButton}
        onPress={handleImageUpload}
      >
        <Text style={styles.imageUploadText}>Pick an Image</Text>
      </TouchableOpacity>

      {profilePic && (
        <View style={{ alignItems: "center" }}>
          <Image source={{ uri: profilePic }} style={styles.imagePreview} />
          <TouchableOpacity
            style={{ backgroundColor: "blue", marginVertical: 5 }}
            onPress={uploadImage}
          >
            <Text>Upload Image</Text>
          </TouchableOpacity>
        </View>
      )}
      
      <TouchableOpacity style={styles.signupBtn} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor:'#102733'
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    color:"#A9B2B6",
    fontFamily:'TekoSemiBold'
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#FCCD00",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 20,
    color:'#A9B2B6'
  },
  imageUploadButton: {
    backgroundColor: "#283F4D",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  imageUploadText: {
    color: "#FCCD00",
    textAlign: "center",
    fontFamily:'Convergence'
  },
  imagePreview: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginVertical: 10,
  },
  signupBtn: {
    backgroundColor: "#FCCD00",
    padding: 10,
    width:"50%",
    borderRadius: 20,
    alignItems: "center",
    justifyContent:'center',
    marginBottom: 10,
  },

  buttonText: {
    color: "black",
    fontSize: 16,
    fontFamily:'Convergence'
  },
});

export default SignUpScreen;
