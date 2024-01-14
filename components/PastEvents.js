import React from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";

const PastEvents = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Past Events</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/images/old1.jpg")}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/images/old2.jpg")}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/images/old3.jpg")}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/images/old4.jpg")}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/images/old5.jpg")}
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
    marginBottom: 20,
    marginHorizontal:10,
    backgroundColor:'#f4f5ff',
    padding:10,
    borderRadius:15,
    borderWidth: 1,
    borderColor: '#feffff',
    shadowColor: '#000',
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

export default PastEvents;
