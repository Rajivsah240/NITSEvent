import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "../AuthContext";
import { FIRESTORE_DB } from "../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import * as Font from "expo-font";
const ProfileScreen = ({ navigation }) => {
  const { logout, loggedIn, user } = useAuth();
  const [event, setRegisteredEvents] = useState([]);
  const [registeredEventsCount, setRegisteredEventsCount] = useState(0);
  const name = user ? user.name : '';
  const email = user ? user.email : '';
  const [fontsLoaded, setFontsLoaded] = useState(false);
  let customFonts = {
    Convergence: require("../assets/fonts/Convergence-Regular.ttf"),
    Monoton: require("../assets/fonts/Monoton-Regular.ttf"),
    Teko: require("../assets/fonts/Teko-VariableFont_wght.ttf"),
    TekoSemiBold: require("../assets/fonts/Teko-SemiBold.ttf"),
    TekoMedium: require("../assets/fonts/Teko-Medium.ttf"),
  };

  const fetchRegisteredEventsCount = async () => {
    try {
      const registeredEventsCollectionRef = collection(
        FIRESTORE_DB,
        "registeredEvents"
      );
      const q = query(
        registeredEventsCollectionRef,
        where("userId", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      const fetchedEvents = [];
      querySnapshot.forEach((doc) => {
        fetchedEvents.push(doc.data());
      });
      setRegisteredEvents(fetchedEvents);
      setRegisteredEventsCount(querySnapshot.size);
    } catch (error) {
      console.error("Error fetching registered events count: ", error);
    }
  };
  const loadFontsAsync = async () => {
    await Font.loadAsync(customFonts);
    setFontsLoaded(true);
  };

  useEffect(() => {
    if (!loggedIn) {
      navigation.navigate("WelcomeScreen");
    } else {
      fetchRegisteredEventsCount();
    }
  }, [loggedIn]);

  useFocusEffect(
    React.useCallback(() => {
      fetchRegisteredEventsCount();
      loadFontsAsync();
    }, [navigation])
  );
  if (!fontsLoaded) {
    return null;
  }

  const handleLogout = async () => {
    await logout();
  };
  return (
    <View style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 40 }}>
          <Avatar.Image
            source={{
              uri: loggedIn
                ? user.imageURL
                : "https://commondatastorage.googleapis.com/codeskulptor-assets/space%20station.png",
            }}
            size={80}
          />
          <View style={{ marginLeft: 20 }}>
            <Title style={[styles.title, { marginTop: 15, marginBottom: 5 }]}>
              {name}
            </Title>
            <Caption style={styles.caption}>{email}</Caption>
          </View>
        </View>
      </View>
      {/* Box for Events Registered and Events Attended */}
      <View style={styles.eventBox}>
        <View style={styles.eventItem}>
          <Text style={styles.eventLabel}>Events Registered</Text>
          <Text style={styles.eventCount}>{registeredEventsCount}</Text>
        </View>
        <View style={styles.eventItem}>
          <Text style={styles.eventLabel}>Events Attended</Text>
          <Text style={styles.eventCount}>0</Text>
        </View>
      </View>
      <Drawer.Section style={styles.drawerSection}>
        <TouchableRipple
          onPress={() => {
            navigation.navigate("RegisteredEvents", { event });
          }}
        >
          <View style={styles.drawerItem}>
            <MaterialIcons name="event-note" size={30} color="#A9B2B6" />
            <Text style={styles.drawerItemText}>Registered Events</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple onPress={handleLogout}>
          <View style={styles.drawerItem}>
            <Feather name="log-out" size={30} color="#A9B2B6" />
            <Text style={styles.drawerItemText}>Log Out</Text>
          </View>
        </TouchableRipple>
      </Drawer.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#102733",
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 20,
    // fontWeight: "bold",
    fontFamily:'TekoSemiBold',
    color: "#fff",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    color: "#999",
  },
  drawerSection: {
    marginTop: 15,
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  drawerItemText: {
    paddingLeft: 5,
    fontSize: 18,
    color: "#d3d6db",
    fontFamily:'TekoMedium'
  },

  eventBox: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FCCD00",
    marginHorizontal: 15,
    padding: 10,
    marginVertical: 10,
    borderRadius: 25,
  },

  eventItem: {
    alignItems: "center",
  },

  eventLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },

  eventCount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0066cc",
  },
  drawerTitle: {
    fontSize: 35,
    fontWeight: "bold",
    color: "white",
  },
});

export default ProfileScreen;
