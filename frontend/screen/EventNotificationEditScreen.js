// EventNotificationEditScreen.js

import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { getDoc, collection, doc, updateDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../config/firebase";

const EventNotificationEditScreen = ({navigation,route }) => {
  const { eventId } = route.params;
  const [notification, setNotification] = useState("");
  console.log('id: ',eventId);

  const handlePostNotification = async () => {
    try {
      const eventRef = doc(FIRESTORE_DB, "event", eventId);
      const eventSnapshot = await getDoc(eventRef);
  
      if (!eventSnapshot.exists()) {
        console.error("Event not found");
        return;
      }
  
      const eventData = eventSnapshot.data();
      console.log("NTFS: ",eventData.notifications)
  
      const notificationsArray =
        Array.isArray(eventData?.notifications) ? eventData.notifications : [];
  
      const updatedEvent = {
        ...eventData,
        notifications: [
          ...notificationsArray,
          {
            notification,
            dayPosted: new Date(),
          },
        ],
      };
  
      await updateDoc(eventRef, updatedEvent);
  
      console.log("Notification posted successfully");
      navigation.navigate("ClubHomeScreen");
    } catch (error) {
      console.error("Error posting notification: ", error);
    }
  };
  
  
  
  

  return (
    <View style={styles.notificationContainer}>
      <View style={styles.notificationHeader}>
        <Text style={styles.notificationHeaderTxt}>Post Notification</Text>
      </View>
      <TextInput
        placeholder="Enter your notification here"
        value={notification}
        onChangeText={setNotification}
        style={styles.notificationInput}
      />
      <Button title="Post Notification" onPress={handlePostNotification} />
    </View>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    // marginTop:50
  },
  notificationHeader: {
    alignItems: "center",
    marginTop: 50,
  },
  notificationHeaderTxt: {
    fontSize: 24,
  },
  notificationInput: {
    padding: 40,
    fontSize: 24,
  },
});

export default EventNotificationEditScreen;
