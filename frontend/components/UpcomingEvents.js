import { React, useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Octicons } from '@expo/vector-icons';

import { FIRESTORE_DB } from "../config/firebase";
import { collection, getDocs, where, query, getFirestore, Timestamp, orderBy } from "firebase/firestore";
import { parseISO, format } from 'date-fns';

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        
        const eventsCollection = collection(FIRESTORE_DB, "event");
        
        // Get the current date and time
        const currentDate = Timestamp.now();

        // Create a query to filter out past events
        const q = query(
          eventsCollection,
          where("date", ">", currentDate),
          orderBy("date", "asc")  // You can order by date if needed
        );

        const querySnapshot = await getDocs(q);

        const fetchedEvents = [];
        querySnapshot.forEach((doc) => {
          fetchedEvents.push({ id: doc.id, ...doc.data() });
        });

        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Upcoming Events</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {events.map((event) => (
          <View style={styles.card} key={event.id}>
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
                      {event.date ? format(event.date.toDate(), 'MMMM dd, yyyy') : ''}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Feather name="watch" size={15} color="#dce0dd" />
                    <Text style={{ fontSize: 15, color: "#cccccc", paddingLeft: 7 }}>
                      {event.time ? format(event.time.toDate(), 'hh:mm a') : ''}
                    </Text>
                  </View>
                </View>
                <View style={styles.eventDateTime}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <EvilIcons name="location" size={15} color="#cccccc" />
                    <Text
                      style={{ fontSize: 15, color: "#cccccc", paddingLeft: 6 }}
                    >
                      {event.venue}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Octicons name="organization" size={15} color="#dce0dd" />
                    <Text
                      style={{ fontSize: 15, color: "#cccccc", paddingLeft: 7 }}
                    >
                      {event.clubName}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
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
  text: {
    fontSize: 22,
    paddingLeft: 12,
    paddingBottom: 12,
    fontWeight: "bold",
    color: "black",
  },
  scrollViewContent: {
    alignItems: "center",
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

export default UpcomingEvents;
