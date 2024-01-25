import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import HeaderBar from "../components/HeaderBar";

import { FIRESTORE_DB } from "../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import YourEvents from "../clubComponents/YourEvents";
import { useAuth } from "../AuthContext";

const ClubHomeScreen = ({ navigation }) => {
  const [showAddEvent, setShowAddEvent] = useState(false);

  const handleAddEventPress = () => {
    setShowAddEvent(!showAddEvent);
  };

  const handleAddEvent = () => {
    navigation.navigate("EventAdd");
  };
  const handleSignOut = () => {
    navigation.navigate("WelcomeScreen");
  };

  const [events, setEvents] = useState([]);
  const { user } = useAuth();

  useFocusEffect(
    React.useCallback(() => {
      const fetchEvents = async () => {
        try {
          const q = query(
            collection(FIRESTORE_DB, "event"),
            where("uid", "==", user.uid)
          );
          const querySnapshot = await getDocs(q);

          const fetchedEvents = [];
          querySnapshot.forEach((doc) => {
            fetchedEvents.push({id: doc.id, ...doc.data()});
          });

          setEvents(fetchedEvents);
        } catch (error) {
          console.error("Error fetching events: ", error);
        }
      };

      fetchEvents();
    }, [user])
  );

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <HeaderBar onSignOut={handleSignOut} />

          <View style={styles.listCard}>
            <Text style={styles.text}>Your Events</Text>

            {events.length > 0 ? (
              events.map((item) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ClubEventDetails", { item });
                  }}
                >
                  <YourEvents key={item.id} event={item} />
                </TouchableOpacity>
              ))
            ) : (
              <Text>No events found.</Text>
            )}
          </View>
        </View>
      </ScrollView>
      {showAddEvent && (
        <TouchableOpacity style={styles.addButton} onPress={handleAddEvent}>
          <Text style={styles.addEventText}>Add an Event</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={handleAddEventPress}
      >
        <Text style={styles.buttonText}>
          {showAddEvent ? "  x  " : "  +  "}
        </Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#102733",
  },
  listCard: {
    marginTop: 10,
    alignItems: "center",
  },
  text: {
    fontSize: 28,
    paddingBottom: 12,
    fontFamily:'TekoSemiBold',
    color:'#A9B2B6'
  },
  addButton: {
    position: "absolute",
    bottom: 80,
    right: 20,
    backgroundColor: "#96bcfa",
    padding: 10,
    borderRadius: 5,
  },
  addEventText: {
    color: "white",
  },
  floatingButton: {
    position: "absolute",
    bottom: 25,
    right: 20,
    backgroundColor: "#96bcfa",
    padding: 15,
    borderRadius: 50,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default ClubHomeScreen;
