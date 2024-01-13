import React from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";

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
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/images/AC.jpg")}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/images/Bihu.jpg")}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/images/pixelate.jpg")}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/images/SchoolGenius.jpg")}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        {/* Add more images as needed */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20, // Add some margin at the bottom to separate from other components
  },
  text: {
    fontSize: 22,
    paddingLeft: 12,
    paddingBottom: 12,
    fontWeight: "bold",
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  imageContainer: {
    height: 150,
    width: 300,
    marginHorizontal: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});

export default UpcomingEvents;
