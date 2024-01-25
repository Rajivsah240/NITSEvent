import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Divider } from "react-native-paper";
import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { FIRESTORE_DB } from "../config/firebase";
import { Timestamp, collection, getDocs } from "firebase/firestore";


import HeaderBar from "../components/HeaderBar";
import UpcomingEvents from "../components/UpcomingEvents";
import PastEvents from "../components/PastEvents";

import * as Font from "expo-font";
import CalendarNew from "../components/CalendarNew";
import HeaderEvent from "../components/HeaderEvent";

const HomeScreen = ({ navigation }) => {
  
  const [clubs, setClubs] = useState([]);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  const fetchEventsForDate = async (date) => {
    try {
      // Fetch events for the selected date from your database
      // Update the 'events' state with the fetched events
      // Example:
      const eventsCollectionRef = collection(FIRESTORE_DB, "event");
      const querySnapshot = await getDocs(eventsCollectionRef);
      const fetchedEvents = [];
      querySnapshot.forEach((doc) => {
        const eventData = doc.data();
        // Check if the event date matches the selected date
        if (eventData.date.toDate().toDateString() === date.toDateString()) {
          fetchedEvents.push({
            id: doc.id,
            ...doc.data(),
          });
        }
      });
      setEvents(fetchedEvents);
    } catch (error) {
      console.error("Error fetching events: ", error);
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };
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
    
    const fetchClubs = async () => {
      try {
        const clubsCollectionRef = collection(FIRESTORE_DB, "clubUsers");
        const querySnapshot = await getDocs(clubsCollectionRef);

        const fetchedClubs = [];
        querySnapshot.forEach((doc) => {
          fetchedClubs.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setClubs(fetchedClubs);
      } catch (error) {
        console.error("Error fetching clubs: ", error);
      }
    };

    fetchClubs();
    fetchEventsForDate(selectedDate);
  }, []);

  useEffect(() => {
    fetchEventsForDate(selectedDate);
  }, [selectedDate]);


  
  if (!fontsLoaded) {
    return null;
  }
  const handleSignOut = () => {
    navigation.navigate("WelcomeScreen");
  };
  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <HeaderBar onSignOut={handleSignOut} />
        <HeaderEvent selectedDate={selectedDate} events={events} />
        <CalendarNew selectedDate={selectedDate} onSelectDate={handleDateSelect} />
        <Divider style={{marginTop:15}} horizontalInset={true}/>
        <UpcomingEvents />
        <PastEvents />
        <View style={styles.container}>
          <Text style={styles.text}>Clubs</Text>
          <View style={styles.clubContainer}>
            <FlatList
              data={clubs}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ClubDetails", { item });
                  }}
                >
                  <View style={styles.clubImageContainer}>
                    <Image
                      source={{ uri: item.imageURL }}
                      style={styles.clubImage}
                    />
                    <Text style={styles.clubText}>{item.clubName}</Text>
                  </View>
                </TouchableOpacity>
              )}
              numColumns={3}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    // paddingTop: 20,
    paddingBottom: 120,
    // paddingHorizontal: 10,
    flexDirection: "column",
    // borderRadius: 15,
    backgroundColor: "#F1F0F9",
  },
  calenderContainer: {
    paddingTop: 20,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  container: {
    marginBottom: 20,
    marginHorizontal: 10,
    backgroundColor: "#283F4D",
    padding: 10,
    borderRadius: 15,
  },
  text: {
    fontSize: 28,
    paddingLeft: 12,
    paddingBottom: 12,
    fontFamily: "TekoMedium",
    color: "#A9B2B6",
  },
  clubContainer: {
    alignItems: "center",
  },
  clubImageContainer: {
    borderColor: "red",
    flexDirection: "column",
    alignItems: "center",
    flexWrap: "wrap",
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  clubImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 10,
  },
  clubText: {
    fontSize: 17,
    color: "#A9B2B6",
    fontFamily: "TekoMedium",
  },
});

export default HomeScreen;
