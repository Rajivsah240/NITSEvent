import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { parseISO, format } from "date-fns";

import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import * as Font from "expo-font";
const RegisteredEvents = ({ navigation, route }) => {
  const { event } = route.params;
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
    <View style={styles.container}>
      <View style={styles.registerHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text
            style={{
              backgroundColor: "#FCCD00",
              fontFamily:'Convergence',
              padding: 10,
              borderRadius: 10,
              color: "#000000",
            }}
          >
            Back
          </Text>
        </TouchableOpacity>
        <Text style={styles.heading}>Registered Events</Text>
      </View>
      <ScrollView>
        <View>
          {/* <HeaderBar onSignOut={handleSignOut} /> */}

          <View style={styles.listCard}>
            {event.length > 0 ? (
              event.map((item) => (
                <View style={styles.card}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={{ uri: item.imageURL }}
                      style={styles.image}
                      resizeMode="cover"
                    />
                    <View style={styles.eventDetails}>
                      <View style={styles.eventDateTime}>
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <FontAwesome5
                            name="calendar-alt"
                            size={15}
                            color="#000000"
                            
                          />
                          <Text
                            style={{
                              fontSize: 15,
                              color: "#000000",
                              paddingLeft: 7,
                              fontFamily:'TekoMedium',
                              paddingTop:2
                            }}
                          >
                            {item.date
                              ? format(item.date.toDate(), "MMMM dd, yyyy")
                              : ""}
                          </Text>
                        </View>
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Feather name="watch" size={15} color="#000000" />
                          <Text
                            style={{
                              fontSize: 15,
                              color: "#000000",
                              paddingLeft: 7,
                              fontFamily:'TekoMedium',
                              paddingTop:2
                            }}
                          >
                            {item.time
                              ? format(item.time.toDate(), "hh:mm a")
                              : ""}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.eventDateTime}>
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <EvilIcons
                            name="location"
                            size={15}
                            color="#000000"
                          />
                          <Text
                            style={{
                              fontSize: 15,
                              color: "#000000",
                              paddingLeft: 7,
                              fontFamily:'TekoMedium',
                              paddingTop:2
                            }}
                          >
                            {item.venue}
                          </Text>
                        </View>
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Octicons
                            name="organization"
                            size={15}
                            color="#000000"
                          />
                          <Text
                            style={{
                              fontSize: 15,
                              color: "#000000",
                              paddingLeft: 7,
                              fontFamily:'TekoMedium',
                              paddingTop:2
                            }}
                          >
                            {item.clubName}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              ))
            ) : (
              <Text>No events found.</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default RegisteredEvents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#102733",
    paddingVertical: 60,
  },
  registerHeader: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  heading: {
    fontSize: 28,
    fontFamily:'TekoSemiBold',
    color: "#A9B2B6",
    left: -40,

  },
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
