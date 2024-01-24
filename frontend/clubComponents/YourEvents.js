import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { parseISO, format } from "date-fns";

import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Octicons } from '@expo/vector-icons';
const YourEvents = ({ event }) => {
  // Convert Firestore Timestamp to JavaScript Date
  const eventDate = event.date ? event.date.toDate() : null;
  const eventTime = event.time ? event.time.toDate() : null;

  // Format date and time
  const formattedDate = eventDate ? format(eventDate, "MMMM dd, yyyy") : "";
  const formattedTime = eventTime ? format(eventTime, "hh:mm a") : "";

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
              <FontAwesome5 name="calendar-alt" size={15} color="#cccccc" />
              <Text style={{ fontSize: 15, color: "#cccccc", paddingLeft: 7 }}>
                {formattedDate}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Feather name="watch" size={15} color="#dce0dd" />
              <Text style={{ fontSize: 15, color: "#cccccc", paddingLeft: 7 }}>
                {formattedTime}
              </Text>
            </View>
          </View>
          <View style={styles.eventDateTime}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <EvilIcons name="location" size={15} color="#cccccc" />
              <Text style={{ fontSize: 15, color: "#cccccc", paddingLeft: 6 }}>
                {event.venue}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Octicons name="organization" size={15} color="#dce0dd" />
              <Text style={{ fontSize: 15, color: "#cccccc", paddingLeft: 7 }}>
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
    backgroundColor: "#f4f5ff",
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#feffff",
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 15,
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
    backgroundColor: "white",
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
