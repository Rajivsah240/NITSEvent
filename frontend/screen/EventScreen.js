import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, TextInput, Text, FlatList } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { FIRESTORE_DB } from "../config/firebase";
import { query, collection, getDocs } from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";
import * as Font from "expo-font";
import CurrentFeedEvents from "../components/CurrentFeedEvents";
const EventScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchText, setSearchText] = useState("");
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

  const fetchEvents = async () => {
    try {
      const q = query(collection(FIRESTORE_DB, "event"));
      const querySnapshot = await getDocs(q);
      
      const fetchedEvents = [];
      querySnapshot.forEach((doc) => {
        fetchedEvents.push(doc.data());
      });
      
      setEvents(fetchedEvents);
      setFilteredEvents(fetchedEvents);
    } catch (error) {
      console.error("Error fetching events: ", error);
    }
  };
  
  useEffect(() => {
    loadFontsAsync();
    fetchEvents();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchEvents();
      loadFontsAsync();
    }, [navigation])
  );
  
  if (!fontsLoaded) {
    return null;
  }

  const handleSearch = () => {
    const filtered = events.filter((event) =>
      event.eventName.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredEvents(filtered);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F1F0F9" }}>
      <View style={styles.InputContainerComponent}>
        <TouchableOpacity onPress={handleSearch}>
          <EvilIcons style={styles.InputIcon} name="search" size={24} color="red" />
        </TouchableOpacity>
        <TextInput
          placeholder="Find Your Event..."
          value={searchText}
          onChangeText={(text) => {
            setSearchText(text);
            handleSearch();
          }}
          placeholderTextColor={"black"}
          style={styles.TextInputContainer}
        />

        {searchText.length > 0 ? (
          <TouchableOpacity onPress={handleSearch}>
            <AntDesign style={styles.InputIcon} name="rightcircleo" size={24} color="red" />
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
      <View style={styles.listCard}>
      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("DetailScreenStudent", { item });
            }}
          >
            <CurrentFeedEvents key={item.id} event={item} />
          </TouchableOpacity>
        )}
        ListHeaderComponent={() => null}
      /></View>
    </View>
  );
};

const styles = StyleSheet.create({
  InputContainerComponent: {
    flexDirection: "row",
    marginHorizontal: 30,
    marginVertical:20,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    borderRadius: 15,
  },
  InputIcon: {
    marginHorizontal: 20,
  },
  TextInputContainer: {
    flex: 1,
    height: 40,
    fontSize: 14,
    color: "#29404E",
    // fontFamily:'Convergence'
  },
  listCard: {
    marginTop: 10,
    alignItems: "center",
  },
});

export default EventScreen;
