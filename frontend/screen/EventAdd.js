import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { format } from "date-fns";
import * as Font from "expo-font";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FIRESTORE_DB, app, storage } from "../config/firebase";
import {
  getStorage,
  getFirestore,
  addDoc,
  collection,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { Timestamp } from "firebase/firestore";

const EventAdd = ({ navigation }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [venue, setVenue] = useState("");
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [uploading, setUploading] = useState(false);
  // const db = getFirestore(app);

  const [formattedDate, setFormattedDate] = useState(
    format(date, "MMMM dd, yyyy")
  );
  const [formattedTime, setFormattedTime] = useState(format(time, "hh:mm a"));

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
        quality: 1,
      });

      console.log("ImagePicker result:", result);

      if (!result.cancelled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("ImagePicker error:", error);
    }
  };

  const uploadImage = async () => {
    try {
      const response = await fetch(image);
      const blob = await response.blob();

      const storage = getStorage(app);

      const storageRef = ref(storage, `Pictures/Image1`);
      const snapshot = await uploadBytes(storageRef, blob);

      const url = await getDownloadURL(snapshot.ref);

      console.log("Download URL: ", url);
      setImageURL(url);
      console.log(imageURL);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    try {
      const docRef = await addDoc(collection(FIRESTORE_DB, "event"), {
        eventName,
        description,
        date: Timestamp.fromDate(date),
        time: Timestamp.fromDate(time),
        venue,
        imageUrl: imageURL,
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
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

      <TouchableOpacity
        style={styles.imageUploadButton}
        onPress={handleImageUpload}
      >
        <Text style={styles.imageUploadText}>Upload Image</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={uploadImage}>
        <Text>Upload Image</Text>
      </TouchableOpacity>

      {image && (
        <View style={{ alignItems: "center" }}>
          <Image source={{ uri: image }} style={styles.imagePreview} />
        </View>
      )}

      <View style={styles.dateTimePickerButton}>
        <Text style={styles.selectedDateTime}>{formattedDate}</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <AntDesign name="calendar" size={20} color="black" />
          {/* <Text style={styles.datePickerText}>Select Date</Text> */}
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

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: "#f4f5ff",
    height: "100%",
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
