import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

// import axios from 'axios';

import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { format } from "date-fns";
import * as Font from "expo-font";

import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { FIRESTORE_DB, FIREBASE_APP } from "../config/firebase";
import { getStorage, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { useAuth } from "../AuthContext";
import { customFonts } from "../Theme";
const EventAdd = ({ navigation }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [clubName, setClubName] = useState("");
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [venue, setVenue] = useState("");
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [uploaded,setUploaded] = useState(false);
  
  const {user} =useAuth();

  const [formattedDate, setFormattedDate] = useState(
    format(date, "MMMM dd, yyyy")
  );
  const [formattedTime, setFormattedTime] = useState(format(time, "hh:mm a"));


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

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      setFormattedDate(format(selectedDate, "MMMM dd, yyyy"));
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setTime(selectedTime);

      setFormattedTime(format(selectedTime, "hh:mm a"));
    }
  };

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
        setImage(result.assets[0].uri);
        console.log("Image URI set:", result.uri);
      }
    } catch (error) {
      console.error("ImagePicker error:", error);
    }
  };
  const uploadImage = async () => {
    try {
      const response = await fetch(image);
      const blob = await response.blob();

      const storage = getStorage(FIREBASE_APP);

      const uriComponents = image.split("/");
      const imageName = uriComponents[uriComponents.length - 1];

      const storageRef = ref(storage, `EventPictures/${imageName}`);
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

  const handleSubmit = async () => {
    try {
      const docRef = await addDoc(collection(FIRESTORE_DB, "event"), {
        uid:user.uid,
        clubName,
        eventName,
        description,
        date: Timestamp.fromDate(date),
        time: Timestamp.fromDate(time),
        dayPosted:Timestamp.now(),
        timePosted:Timestamp.now(),
        venue,
        imageURL,
      });
      console.log("Document written with ID: ", docRef.id);
      navigation.navigate("ClubHomeScreen");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.headerText}>Add Event</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Event Name"
        value={eventName}
        onChangeText={setEventName}
      />

      <TextInput
        style={styles.input}
        placeholder="Description"
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Club Name"
        value={clubName}
        onChangeText={setClubName}
      />

      <TouchableOpacity
        style={styles.imageUploadButton}
        onPress={handleImageUpload}
      >
        <Text style={styles.imageUploadText}>Pick an Image</Text>
      </TouchableOpacity>

      {image && (
        <View style={{ alignItems: "center" }}>
          <Image source={{ uri: image }} style={styles.imagePreview} />
          <TouchableOpacity style={{backgroundColor:'blue',marginVertical:5}} onPress={uploadImage}>
            <Text>Upload Image</Text>

          </TouchableOpacity>
        </View>
      )}

      <View style={styles.dateTimePickerButton}>
        <Text style={styles.selectedDateTime}>{formattedDate}</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <AntDesign name="calendar" size={20} color="black" />
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker value={date} mode="date" onChange={handleDateChange} />
      )}
      <View style={styles.dateTimePickerButton}>
        <Text style={styles.selectedDateTime}>{formattedTime}</Text>
        <TouchableOpacity onPress={() => setShowTimePicker(true)}>
          <Ionicons name="watch-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          is24Hour={false}
          onChange={handleTimeChange}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Venue"
        value={venue}
        onChangeText={setVenue}
      />

      {uploaded?<Button title="Submit" onPress={handleSubmit} />:<Button disabled={true} title="Submit" onPress={handleSubmit} />}
    </View></ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: "#f4f5ff",
    height: "100%",
    marginTop:20
  },
  headerText: {
    fontSize: 30,
    fontFamily: "TekoSemiBold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
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
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginVertical: 10,
  },
  dateTimePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderBlockColor: "black",
    borderWidth: 1,
    marginHorizontal: 70,
    marginBottom: 10,
    paddingVertical: 3,
    borderRadius: 5,
  },
  datePickerText: {
    color: "white",
    textAlign: "center",
  },
  timePickerText: {
    color: "white",
    textAlign: "center",
  },
  selectedDateTime: {
    fontSize: 16,
  },
});

export default EventAdd;
