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
import { FIRESTORE_DB } from "../config/firebase";
import { Timestamp, collection, getDocs } from "firebase/firestore";

import HeaderBar from "../components/HeaderBar";

import * as Font from "expo-font";
import CalendarNew from "../components/CalendarNew";
import HeaderEvent from "../components/HeaderEvent";
import CurrentFeed from "../components/CurrentFeed";

const HomeScreen = ({ navigation }) => {
  
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [feedEvents, setFeedEvents] = useState([]);

  const fetchEventsForDate = async (date) => {
    try {
      const eventsCollectionRef = collection(FIRESTORE_DB, "event");
      const querySnapshot = await getDocs(eventsCollectionRef);
      const fetchedEvents = [];
      const feedFetchedEvents = [];
      querySnapshot.forEach((doc) => {
        const eventData = doc.data();
        if (eventData.date.toDate().toDateString() === date.toDateString()) {
          fetchedEvents.push({
            id: doc.id,
            ...doc.data(),
          });
        }
        feedFetchedEvents.push({ id: doc.id, ...doc.data() });
      });
      setEvents(fetchedEvents);
      setFeedEvents(feedFetchedEvents);
      console.log(feedEvents);
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
    <>
      <View style={styles.mainContainer}>
        <HeaderBar onSignOut={handleSignOut} />
        <ScrollView>
          <HeaderEvent selectedDate={selectedDate} events={events} />
          <CalendarNew
            selectedDate={selectedDate}
            onSelectDate={handleDateSelect}
          />
          <Divider style={{ marginVertical: 15 }} horizontalInset={true} />
          <CurrentFeed feedEvents={feedEvents} />
          {/*  */}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    // paddingTop: 20,
    // paddingBottom: 150,
    // paddingHorizontal: 10,
    flexDirection: "column",
    // borderRadius: 15,
    backgroundColor: "#F1F0F9",
    paddingBottom:100
  },
  calenderContainer: {
    paddingTop: 20,
  },
});

export default HomeScreen;
