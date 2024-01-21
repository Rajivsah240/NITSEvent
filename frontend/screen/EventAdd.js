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

import axios from 'axios';
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { format } from "date-fns";
import * as Font from "expo-font";

import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const EventAdd = ({navigation}) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [venue, setVenue] = useState("");
  const [imageUri, setImageUri] = useState(null);

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
        // aspect: [4, 3],
        quality: 1,
      });
  
      console.log("ImagePicker result:", result);
  
      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
        console.log("Image URI set:", result.uri);
      }
    } catch (error) {
      console.error("ImagePicker error:", error);
    }
  };
  

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://192.168.211.171:3001/events', {
          eventName,
          description,
          date,
          time,
          venue,
          imageUri,
      });
  
      if (response.status === 201) {
        console.log('Success', 'Event added successfully');
      } else {
        console.error('Error', 'Failed to add event');
      }
    } catch (error) {
      console.error('Error adding event:', error);
      console.log('Error', 'Internal server error');
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

      {imageUri && (
        <View style={{alignItems :'center'}}><Image source={{ uri: imageUri }} style={styles.imagePreview} /></View>
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
        <DateTimePicker value={time} mode="time" is24Hour={false} onChange={handleTimeChange} />
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
    marginVertical:10
  },
  dateTimePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderBlockColor: "black",
    borderWidth: 1,
    marginHorizontal: 70,
    marginBottom: 10,
    paddingVertical:3,
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
