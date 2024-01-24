import { StyleSheet, Text, View, Image,ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { parseISO, format } from "date-fns";

import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Octicons } from '@expo/vector-icons';

const RegisteredEvents = ({ navigation,route }) => {
  const { event } = route.params;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={{ alignItems: "center",marginTop:60 }}>
            <Text
              style={{
                borderColor: "red",
                borderWidth: 1,
                padding: 10,
                borderRadius: 10,
              }}
            >
              Back
            </Text>
          </View>
        </TouchableOpacity>
      <View style={styles.registerHeader}>
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
                            color="#cccccc"
                          />
                          <Text
                            style={{
                              fontSize: 15,
                              color: "#cccccc",
                              paddingLeft: 7,
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
                          <Feather name="watch" size={15} color="#dce0dd" />
                          <Text
                            style={{
                              fontSize: 15,
                              color: "#cccccc",
                              paddingLeft: 7,
                            }}
                          >
                            {item.time ? format(item.time.toDate(), "hh:mm a") : ""}
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
                            color="#cccccc"
                          />
                          <Text
                            style={{
                              fontSize: 15,
                              color: "#cccccc",
                              paddingLeft: 6,
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
                            color="#dce0dd"
                          />
                          <Text
                            style={{
                              fontSize: 15,
                              color: "#cccccc",
                              paddingLeft: 7,
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
    backgroundColor: "#f4f5ff",
  },
  registerHeader: {
    alignItems: "center",
    marginTop: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
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
