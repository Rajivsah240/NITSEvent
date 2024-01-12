import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Calendar from "../components/Calendar";
import HeaderEvent from "../components/HeaderEvent";
import HeaderBar from "../components/HeaderBar"
const HomeScreen = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <View style={styles.mainContainer}>
      <HeaderBar/>
      <HeaderEvent />
      <View style={styles.container}>
        <Calendar onSelectDate={setSelectedDate} selected={selectedDate} />
        <StatusBar style="auto" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer:{
    marginTop:100,
    flexDirection:'column',
        
  },
  container: {
    // flex: 1,
    // backgroundColor: "#fff",
    // alignItems: 'center',
    // justifyContent: "center",
    
  },
});

export default HomeScreen;
