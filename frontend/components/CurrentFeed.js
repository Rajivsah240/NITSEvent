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
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import CurrentFeedEvents from "./CurrentFeedEvents";

const CurrentFeed = ({ feedEvents }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  let customFonts = {
    Convergence: require("../assets/fonts/Convergence-Regular.ttf"),
    Monoton: require("../assets/fonts/Monoton-Regular.ttf"),
    Teko: require("../assets/fonts/Teko-VariableFont_wght.ttf"),
    TekoSemiBold: require("../assets/fonts/Teko-SemiBold.ttf"),
    TekoMedium: require("../assets/fonts/Teko-Medium.ttf"),
    TekoLight: require("../assets/fonts/Teko-Light.ttf"),
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
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.feedHeader}>
          <View style={styles.feed}>
            <MaterialIcons name="dynamic-feed" size={30} color="black" />
            <Text style={styles.feedText}>For You</Text>
          </View>
          <View style={styles.feed}>
            <Ionicons name="filter" size={15} color="#A9B2B6" />
            <Text style={styles.filterText}>Filter</Text>
          </View>
        </View>
        <View style={styles.listCard}>
          {feedEvents.length > 0 ? (
            feedEvents.map((item) => (
              <CurrentFeedEvents key={item.id} event={item} />
            ))
          ) : (
            <Text>No events found.</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //   backgroundColor: "#102733",
  },
  listCard: {
    marginTop: 10,
    alignItems: "center",
  },
  feedHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    marginBottom: 20,
  },
  feed: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  feedText: {
    fontSize: 34,
    paddingHorizontal: 5,
    fontFamily: "TekoLight",
    color: "#000000",
    textDecorationLine:'underline'
  },
  filterText: {
    fontSize: 20,
    paddingHorizontal: 5,
    fontFamily: "TekoLight",
    color: "#A9B2B6",
  },
});

export default CurrentFeed;
