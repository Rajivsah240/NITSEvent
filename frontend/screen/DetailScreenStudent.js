import { React, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as Font from "expo-font";

const DetailScreenStudent = ({ navigation, route }) => {
  const { item } = route.params;
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

  const handleRegisterPress = () => {
    // Navigate to the registration screen with the event ID
    navigation.navigate("EventRegistrationScreen", { item });
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: item.imageURL }} style={styles.eventImage} />
      <View style={styles.eventInfo}>
        <View style={styles.nameCnt}>
          <Text style={styles.eventname}>{item.eventName}</Text>
        </View>
        <View style={styles.eventDateTime}>
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Text style={styles.date}>Date</Text>
            <Text style={styles.time}>
              {item.date.toDate().toLocaleDateString()}
            </Text>
          </View>
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Text style={styles.date}>Time</Text>
            <Text style={styles.time}>
              {item.time.toDate().toLocaleTimeString()}
            </Text>
          </View>
        </View>
        <View style={styles.desc}>
          <Text style={styles.descHead}>Description</Text>
          <Text style={styles.descContent}>{item.description}</Text>
        </View>
        <View style={styles.desc}>
          <Text style={styles.descHead}>Location</Text>
          <Text style={styles.descContent}>{item.venue}</Text>
        </View>

        <View style={styles.desc}>
          <Text style={styles.descHead}>Club/Organizer</Text>
          <Text style={styles.descContent}>{item.clubName}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={handleRegisterPress}>
        <View style={styles.registerButton}>
          <Text style={styles.registerButtonText}>Register for Event</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Tab")}>
        <View style={{ alignItems: "center", marginBottom: 60 }}>
          <Text
            style={{
              backgroundColor:'#FCCD00',
              fontFamily:'Convergence',
              borderWidth: 1,
              padding: 13,
              borderRadius: 10,
            }}
          >
            Back
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: "#283F4D",
  },
  eventInfo: {
    top: -20,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: "#283F4D",
  },

  eventImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
    overflow: "hidden",
  },

  eventname: {
    fontSize: 50,
    fontFamily: "TekoMedium",
    marginVertical: 10,
    paddingLeft: 20,
    paddingVertical: 10,
    color: "#A9B2B6",
  },
  eventDateTime: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  date: {
    fontSize: 23,
    fontFamily: "TekoSemiBold",
  },
  time: {
    fontSize: 20,
    fontFamily: "Teko",
    color: "#A9B2B6",
  },
  desc: {
    flexDirection: "column",
    paddingLeft: 20,
    marginVertical: 10,
    color: "#A9B2B6",
  },
  descHead: {
    fontSize: 24,
    fontFamily: "TekoSemiBold",
  },
  descContent: {
    fontSize: 18,
    fontFamily: "Teko",
    color: "#A9B2B6",
  },
  registerButton: {
    padding: 10,
    borderRadius: 10,
    margin: 20,
    alignItems: "center",
    backgroundColor:'#FCCD00'
  },
  registerButtonText: {
    color: "#000000",
    fontSize: 16,
    fontFamily:'Convergence'
  },
});

export default DetailScreenStudent;
