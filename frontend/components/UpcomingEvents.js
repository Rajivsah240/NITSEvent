import React from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
const UpcomingEvents = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Upcoming Events</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/images/Technoesis.jpg")}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.eventDetails}>
            <View style={styles.eventDateTime}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwesome5 name="calendar-alt" size={15} color="#cccccc" />
                <Text style={{ fontSize: 15, color: "#cccccc", paddingLeft: 7 }}>
                  01/01/24
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Feather name="watch" size={15} color="#cccccc" />
                <Text style={{ fontSize: 15, color: "#cccccc", paddingLeft: 7 }}>
                  09:00
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <EvilIcons name="location" size={15} color="#cccccc" />
              <Text style={{ fontSize: 15, color: "#cccccc" }}>Gymkhana Park</Text>
            </View>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/images/AC.jpg")}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.eventDetails}>
            <View style={styles.eventDateTime}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwesome5 name="calendar-alt" size={15} color="#cccccc" />
                <Text style={{ fontSize: 15, color: "#cccccc", paddingLeft: 7 }}>
                  01/01/24
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Feather name="watch" size={15} color="#cccccc" />
                <Text style={{ fontSize: 15, color: "#cccccc", paddingLeft: 7 }}>
                  09:00
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <EvilIcons name="location" size={15} color="#cccccc" />
              <Text style={{ fontSize: 15, color: "#cccccc" }}>Gymkhana Park</Text>
            </View>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/images/Bihu.jpg")}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.eventDetails}>
            <View style={styles.eventDateTime}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwesome5 name="calendar-alt" size={15} color="#cccccc" />
                <Text style={{ fontSize: 15, color: "#cccccc", paddingLeft: 7 }}>
                  01/01/24
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Feather name="watch" size={15} color="#cccccc" />
                <Text style={{ fontSize: 15, color: "#cccccc", paddingLeft: 7 }}>
                  09:00
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <EvilIcons name="location" size={15} color="#cccccc" />
              <Text style={{ fontSize: 15, color: "#cccccc" }}>Gymkhana Park</Text>
            </View>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/images/pixelate.jpg")}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.eventDetails}>
            <View style={styles.eventDateTime}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwesome5 name="calendar-alt" size={15} color="#cccccc" />
                <Text style={{ fontSize: 15, color: "#cccccc", paddingLeft: 7 }}>
                  01/01/24
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Feather name="watch" size={15} color="#cccccc" />
                <Text style={{ fontSize: 15, color: "#cccccc", paddingLeft: 7 }}>
                  09:00
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <EvilIcons name="location" size={15} color="#cccccc" />
              <Text style={{ fontSize: 15, color: "#cccccc" }}>Gymkhana Park</Text>
            </View>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/images/SchoolGenius.jpg")}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.eventDetails}>
            <View style={styles.eventDateTime}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwesome5 name="calendar-alt" size={15} color="#cccccc" />
                <Text style={{ fontSize: 15, color: "#cccccc", paddingLeft: 7 }}>
                  01/01/24
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Feather name="watch" size={15} color="#dce0dd" />
                <Text style={{ fontSize: 15, color: "#cccccc", paddingLeft: 7 }}>
                  09:00
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <EvilIcons name="location" size={15} color="#cccccc" />
              <Text style={{ fontSize: 15, color: "#cccccc" }}>Gymkhana Park</Text>
            </View>
          </View>
        </View>
        {/* Add more images as needed */}
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
