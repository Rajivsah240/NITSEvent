import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Calendar from "../components/Calendar";
import HeaderEvent from "../components/HeaderEvent";
import HeaderBar from "../components/HeaderBar"
import UpcomingEvents from "../components/UpcomingEvents";
import PastEvents from "../components/PastEvents";
import Clubs from "../components/Clubs";
const HomeScreen = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <ScrollView>
    <View style={styles.mainContainer}>
      <HeaderBar/>
      <HeaderEvent />
      <View style={styles.container}>
        <Calendar onSelectDate={setSelectedDate} selected={selectedDate} />
        {/* <StatusBar style="auto" /> */}
      </View>
      <UpcomingEvents/>
      <PastEvents/>
      <Clubs/>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer:{
    paddingTop:20,
    paddingBottom:120,
    flexDirection:'column',
    borderRadius:15,
    backgroundColor:'#f0e5d8'          
  },
  container: {
    // flex: 1,
    // backgroundColor: "#fff",
    // alignItems: 'center',
    // justifyContent: "center",
    
  },
});

export default HomeScreen;
