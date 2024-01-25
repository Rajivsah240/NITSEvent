// EventRegistrationScreen.js

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import { useAuth } from "../AuthContext";
import { FIRESTORE_DB } from "../config/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import * as Font from "expo-font";

const EventRegistrationScreen = ({ navigation, route }) => {
  const { item } = route.params;
  const { user } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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

  const checkDuplicateRegistration = async () => {
    try {
      const registrationsCollectionRef = collection(
        FIRESTORE_DB,
        "registeredEvents"
      );

      const q = query(
        registrationsCollectionRef,
        where("userId", "==", user.uid),
        where("eventName", "==", item.eventName)
      );
      const querySnapshot = await getDocs(q);

      return !querySnapshot.empty; // Returns true if the user has already registered for the event
    } catch (error) {
      console.error("Error checking duplicate registration: ", error);
      return false; // Assume no duplicate if an error occurs
    }
  };

  const handleRegister = async () => {
    try {
      // Validate name and email fields
      if (!name.trim() || !email.trim()) {
        Alert.alert("Validation Error", "Name and Email cannot be empty.", "", [
          { text: "OK" },
        ]);
        return; // Exit the function if validation fails
      }
  
      const isDuplicate = await checkDuplicateRegistration();
  
      if (isDuplicate) {
        Alert.alert(
          "Duplicate Registration",
          "You have already registered for this event.",
          "",
          [
            {
              text: "OK",
              onPress: () => {
                // Navigate back after 1 seconds
                setTimeout(() => {
                  navigation.goBack();
                }, 1000);
              },
            },
          ]
        );
      } else {
        const registrationsCollectionRef = collection(
          FIRESTORE_DB,
          "registeredEvents"
        );
  
        await addDoc(registrationsCollectionRef, {
          userId: user.uid,
          name,
          email,
          eventName: item.eventName,
          clubName: item.clubName,
          date:item.date,
          time:item.time,
          imageURL:item.imageURL,
          venue:item.venue

          // Add more fields as needed
        });
  
        Alert.alert("Registration Successful", "", [
          {
            text: "OK",
            onPress: () => {
              // Navigate back after 3 seconds
              setTimeout(() => {
                navigation.goBack();
              }, 1000);
            },
          },
        ]);
      }
    } catch (error) {
      console.error("Error registering: ", error);
  
      Alert.alert("Error", "Failed to register. Please try again.");
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.registerHeader}><Text style={styles.heading}>Event Registration</Text></View>
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        placeholderTextColor={"#A9B2B6"}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Your Email"
        placeholderTextColor={"#A9B2B6"}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingVertical:60,
    backgroundColor: "#102733",
  },
  registerHeader:{
    alignItems:'center'
  },
  heading: {
    fontSize: 28,
    fontFamily:'TekoSemiBold',
    marginBottom: 20,
    color:"#A9B2B6"
  },
  input: {
    height: 40,
    borderColor: "#FCCD00",
    borderRadius:20,
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    color:'#A9B2B6'
  },
  registerButton: {
    backgroundColor: "#FCCD00",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    // fontFamily:'Convergence'
  },
  registerButtonText: {
    color: "#000000",
    fontFamily:'Convergence',
    fontSize: 16,
  },
});

export default EventRegistrationScreen;
