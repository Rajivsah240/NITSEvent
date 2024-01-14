import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";


import { LinearGradient } from "expo-linear-gradient";
import Calendar from "../components/Calendar";
import HeaderEvent from "../components/HeaderEvent";
import HeaderBar from "../components/HeaderBar";
import UpcomingEvents from "../components/UpcomingEvents";
import PastEvents from "../components/PastEvents";
import Clubs from "../components/Clubs";
import SearchBar from "../components/SearchBar";
const HomeScreen = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <HeaderBar />
        <HeaderEvent />
        <View style={styles.container}>
          <Calendar onSelectDate={setSelectedDate} selected={selectedDate} />
          {/* <StatusBar style="auto" /> */}
        </View>
        <SearchBar/>
        <UpcomingEvents />
        <PastEvents />
        <Clubs />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    // paddingTop: 20,
    paddingBottom: 120,
    // paddingHorizontal: 10,
    flexDirection: "column",
    borderRadius: 15,
    backgroundColor: "#ecedff",
  },
  container: {
    paddingTop: 20,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});

export default HomeScreen;
