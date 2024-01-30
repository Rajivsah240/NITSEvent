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
import {
  collection,
  getDoc,
  where,
  query,
  doc,
  updateDoc,
} from "firebase/firestore";
import * as Font from "expo-font";
import { customFonts } from "../Theme";
const EventRegistrationScreen = ({ navigation, route }) => {
  const { event } = route.params;
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [scholarID, setScholarID] = useState("");
  const [department, setDepartment] = useState("");
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

  const storeRegDetails = async () => {
    try {
      const eventsCollectionRef = doc(FIRESTORE_DB, "event", event.id);
      const eventSnapshot = await getDoc(eventsCollectionRef);

      if (!eventSnapshot.exists()) {
        console.error("Event doesn't exist");
        return;
      }

      const eventData = eventSnapshot.data();
      const registeredStudentsArray = Array.isArray(
        eventData?.registeredStudents
      )
        ? eventData.registeredStudents
        : [];
      const updatedEvent = {
        ...eventData,
        registeredStudents: [
          ...registeredStudentsArray,
          {
            username: user.username,
            name,
            email,
            scholarID,
            department
          },
        ],
      };
      await updateDoc(eventsCollectionRef, updatedEvent);
      console.log("Registered in DB!!");
    } catch (error) {
      console.log("Error in updating the user data", error);
    }
  };

  const handleRegister = async () => {
    try {
      if (!user || !user.uid) {
        console.log("User not authenticated.");
        return;
      }

      const userDocRef = doc(FIRESTORE_DB, "studentUsers", user.uid);
      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) {
        console.log("User document not found.");
        return;
      }

      const userData = userSnapshot.data();
      const registeredEventsArray = Array.isArray(userData?.registeredEvents)
        ? userData.registeredEvents
        : [];

      const isDuplicate = registeredEventsArray.some(
        (Event) => Event.eventId === event.id
      );

      if (isDuplicate) {
        Alert.alert(
          "Duplicate Registration",
          "You have already registered for this event.",
          "",
          [
            {
              text: "OK",
              onPress: () => {
                setTimeout(() => {
                  navigation.goBack();
                }, 1000);
              },
            },
          ]
        );
      } else {
        const updateUser = {
          ...userData,
          registeredEvents: [
            ...registeredEventsArray,
            {
              eventId: event.id,
            },
          ],
        };

        await updateDoc(userDocRef, updateUser);
        console.log("Registered!!");
        await storeRegDetails();

        Alert.alert("Registration Successful", "",[
          {
            text: "OK",
            onPress: () => {
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
      <View style={styles.registerHeader}>
        <Text style={styles.heading}>Event Registration</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor={"#A9B2B6"}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={"#A9B2B6"}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Scholar ID"
        placeholderTextColor={"#A9B2B6"}
        value={scholarID}
        onChangeText={(text) => setScholarID(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Department"
        placeholderTextColor={"#A9B2B6"}
        value={department}
        onChangeText={(text) => setDepartment(text)}
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
    paddingVertical: 60,
    backgroundColor: "#fff",
  },
  registerHeader: {
    alignItems: "center",
  },
  heading: {
    fontSize: 28,
    fontFamily: "TekoLight",
    marginBottom: 20,
    color: "#000000",
  },
  input: {
    height: 40,
    borderColor: "#F1F0F9",
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: "#A9B2B6",
  },
  registerButton: {
    backgroundColor: "#F1F0F9",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    // fontFamily:'Convergence'
  },
  registerButtonText: {
    color: "#000000",
    fontFamily: "Convergence",
    fontSize: 16,
  },
});

export default EventRegistrationScreen;
