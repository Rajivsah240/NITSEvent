import { StyleSheet, Text, View, Image } from "react-native";
import React,{useEffect,useState} from "react";
import { parseISO, format } from "date-fns";

import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Octicons } from '@expo/vector-icons';
import * as Font from "expo-font";
const YourEvents = ({ event }) => {
  // Convert Firestore Timestamp to JavaScript Date
  const eventDate = event.date ? event.date.toDate() : null;
  const eventTime = event.time ? event.time.toDate() : null;

  // Format date and time
  const formattedDate = eventDate ? format(eventDate, "MMMM dd, yyyy") : "";
  const formattedTime = eventTime ? format(eventTime, "hh:mm a") : "";
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

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: event.imageURL }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.eventDetails}>
          <View style={styles.eventDateTime}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome5 name="calendar-alt" size={15} color="#000000" />
              <Text style={{ fontSize: 15, color: "#000000", paddingLeft: 7,fontFamily:'TekoMedium',paddingTop:2 }}>
                {formattedDate}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Feather name="watch" size={15} color="#000000" />
              <Text style={{ fontSize: 15, color: "#000000", paddingLeft: 7,fontFamily:'TekoMedium',paddingTop:2 }}>
                {formattedTime}
              </Text>
            </View>
          </View>
          <View style={styles.eventDateTime}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <EvilIcons name="location" size={15} color="#000000" />
              <Text style={{ fontSize: 15, color: "#000000", paddingLeft: 7,fontFamily:'TekoMedium',paddingTop:2 }}>
                {event.venue}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Octicons name="organization" size={15} color="#000000" />
              <Text style={{ fontSize: 15, color: "#000000", paddingLeft: 7,fontFamily:'TekoMedium',paddingTop:2 }}>
                {event.clubName}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    marginHorizontal: 10,
    backgroundColor: "#283F4D",
    padding: 10,
    borderRadius: 15,
    
    
  },
  cardImage: {
    height: 100,
    width: 100,
    resizeMode: "contain",
  },
  cardDetails: {
    padding: 10,
  },
  eventName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  dateTime: {
    fontSize: 14,
    marginBottom: 5,
  },
  venue: {
    fontSize: 14,
    color: "#777",
  },

  imageContainer: {
    height: 270,
    width: 300,
    marginHorizontal: 10,
    backgroundColor: "#FCCD00",
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  eventDetails: {
    padding: 10,
  },
  eventDateTime: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default YourEvents;
