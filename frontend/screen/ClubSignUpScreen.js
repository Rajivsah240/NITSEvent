// ClubSignUpScreen.js
import React, { useState,useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  Alert
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  FIREBASE_AUTH,
  FIRESTORE_DB,
  FIREBASE_APP,
} from "../config/firebase";

import { getStorage, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { createUserWithEmailAndPassword,getAuth } from "firebase/auth";
import { doc,setDoc } from "firebase/firestore";
import { customFonts } from "../Theme";
import * as Font from "expo-font";

const ClubSignUpScreen = ({navigation}) => {
  const [clubName, setClubName] = useState("");
  const [clubEmail, setClubEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [clubImage, setClubImage] = useState("");
  const [clubDescription, setClubDescription] = useState("");
  const [fbHandle, setFbHandle] = useState("");
  const [instaHandle, setInstaHandle] = useState("");

  const [imageURL, setImageURL] = useState("");
  const [uploaded, setUploaded] = useState(false);

  const [fontsLoaded, setFontsLoaded] = useState(false);

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
        setClubImage(result.assets[0].uri);
        console.log("Image URI set:", result.uri);
      }
    } catch (error) {
      console.error("ImagePicker error:", error);
    }
  };

  const uploadImage = async () => {
    try {
      const response = await fetch(clubImage);
      const blob = await response.blob();

      const storage = getStorage(FIREBASE_APP);

      const uriComponents = clubImage.split("/");
      const imageName = uriComponents[uriComponents.length - 1];

      const storageRef = ref(storage, `ClubPictures/${imageName}`);
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
        clubEmail,
        password
      );

      const user = userCredential.user;
      const userRef = doc(FIRESTORE_DB, "clubUsers", user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        clubName,
        clubEmail,
        imageURL,
        clubDescription,
        fbHandle,
        instaHandle,
      });

      console.log("Club SignUp successful!");
      navigation.navigate("ClubLogin");
    } catch (error) {
        Alert.alert(error.message);
      console.error("Club SignUp failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Club Sign Up</Text>
      <TextInput
        placeholder="Club Name"
        placeholderTextColor={"#A9B2B6"}
        onChangeText={setClubName}
        value={clubName}
        style={styles.input}
      />
      <TextInput
        placeholder="Club Email"
        placeholderTextColor={"#A9B2B6"}
        onChangeText={setClubEmail}
        value={clubEmail}
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
      {/* <TextInput
        placeholder="Club Image URL"
        onChangeText={setClubImage}
        value={clubImage}
        style={styles.input}
      /> */}
      <TouchableOpacity
        style={styles.imageUploadButton}
        onPress={handleImageUpload}
      >
        <Text style={styles.imageUploadText}>Pick an Image</Text>
      </TouchableOpacity>

      {clubImage && (
        <View style={{ alignItems: "center" }}>
          <Image source={{ uri: clubImage }} style={styles.imagePreview} />
          <TouchableOpacity
            style={{ backgroundColor: "blue", marginVertical: 5 }}
            onPress={uploadImage}
          >
            <Text>Upload Image</Text>
          </TouchableOpacity>
        </View>
      )}
      <TextInput
        placeholder="Club Description"
        placeholderTextColor={"#A9B2B6"}
        onChangeText={setClubDescription}
        value={clubDescription}
        style={styles.input}
        multiline
      />
      <TextInput
        placeholder="Club FB Handle Link"
        placeholderTextColor={"#A9B2B6"}
        onChangeText={setFbHandle}
        value={fbHandle}
        style={styles.input}
      />
      <TextInput
        placeholder="Club Insta Handle Link"
        placeholderTextColor={"#A9B2B6"}
        onChangeText={setInstaHandle}
        value={instaHandle}
        style={styles.input}
      />
      
      <TouchableOpacity style={styles.signUpBtn} onPress={handleSignUp}>
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
    color:'#A9B2B6',
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
  signUpBtn: {
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

export default ClubSignUpScreen;
