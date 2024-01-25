import { React, useState, useEffect, FlatList } from "react";
import { StyleSheet, Text, View, Image,ScrollView } from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../config/firebase";
import * as Font from "expo-font";
const HeaderEvent = ({ selectedDate,events }) => {
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
    console.log("date passed in header event: ", selectedDate);
    
  }, [selectedDate]);

  if (!fontsLoaded) {
    return null;
  }

  if (!events || events.length === 0) {
    // Handle the case when events are still being fetched or no events exist
    return (
    
      <View style={styles.headerContainer}>
          <Image
            source={require('../assets/images/no-event.jpg')}
            style={styles.headerImage}
            resizeMode="contain"
          />
        </View>
    );
    
  }
  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {events.map((event, index) => (
        <View style={styles.headerContainer} key={index}>
          <Image
            source={{ uri: event.imageURL }}
            style={styles.headerImage}
            resizeMode="cover"
          />
          <Text style={styles.headerEventName}>{event.eventName}</Text>
          <Text>{console.log(event.imageURL)}</Text>
        </View>
      ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    backgroundColor: "#283F4D",
    height: 300,
    width:340,
    marginHorizontal: 10,
    marginVertical: 30,
    borderRadius: 15,
    paddingBottom: 10,
  },
  headerImage: {
    width: "95%",
    height: "85%",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginVertical: 5,
  },
  headerEventName: {
    fontSize: 30,
    // fontWeight:'bold',
    color: "#A9B2B6",
    fontFamily: "TekoSemiBold",
  },
});

export default HeaderEvent;
