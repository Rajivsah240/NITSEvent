import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Calendar from "../components/Calendar";
import HeaderEvent from "../components/HeaderEvent";
import HeaderBar from "../components/HeaderBar";
import UpcomingEvents from "../components/UpcomingEvents";
import PastEvents from "../components/PastEvents";
import Clubs from "./Clubs";



const HomeScreen = ({navigation}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const handleSignOut = () => {
    console.log('Navigation prop in Clubs:', navigation);
    navigation.navigate('WelcomeScreen');
  };
  return (
    <ScrollView>
      
      <View style={styles.mainContainer}>
        <HeaderBar onSignOut={handleSignOut} />
        <HeaderEvent />
        <View style={styles.container}>
          <Calendar onSelectDate={setSelectedDate} selected={selectedDate} />
        </View>
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
