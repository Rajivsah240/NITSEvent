// ClubSignUpScreen.js
import React, { useState } from "react";
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
        onChangeText={setClubName}
        value={clubName}
        style={styles.input}
      />
      <TextInput
        placeholder="Club Email"
        onChangeText={setClubEmail}
        value={clubEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        style={styles.input}
        secureTextEntry
      />
      <TextInput
        placeholder="Confirm Password"
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
        onChangeText={setClubDescription}
        value={clubDescription}
        style={styles.input}
        multiline
      />
      <TextInput
        placeholder="Club FB Handle Link"
        onChangeText={setFbHandle}
        value={fbHandle}
        style={styles.input}
      />
      <TextInput
        placeholder="Club Insta Handle Link"
        onChangeText={setInstaHandle}
        value={instaHandle}
        style={styles.input}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 20,
  },
  imageUploadButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  imageUploadText: {
    color: "white",
    textAlign: "center",
  },
  imagePreview: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginVertical: 10,
  },
});

export default ClubSignUpScreen;
