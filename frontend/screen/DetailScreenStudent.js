import { React, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList
} from "react-native";
import * as Font from "expo-font";

const DetailScreenStudent = ({ navigation, route }) => {
  const { item } = route.params;
  const [tab, setTab] = useState("Abt");
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
    navigation.navigate("EventRegistrationScreen", { item });
  };
  const renderNotification = ({ item }) => (
    <View style={styles.notificationCard}>
      <Text style={styles.notificationCardText}>{item.notification}</Text>
      <Text style={styles.notificationCardDate}>
        {item.dayPosted.toDate().toLocaleDateString()}
      </Text>
    </View>
  );

  return (
    // <ScrollView style={styles.container}>
    //   <Image source={{ uri: item.imageURL }} style={styles.eventImage} />
    //   <View style={styles.eventInfo}>
    //     <View style={styles.nameCnt}>
    //       <Text style={styles.eventname}>{item.eventName}</Text>
    //     </View>
    //     <View style={styles.eventDateTime}>
    //       <View style={{ flexDirection: "column", alignItems: "center" }}>
    //         <Text style={styles.date}>Date</Text>
    //         <Text style={styles.time}>
    //           {item.date.toDate().toLocaleDateString()}
    //         </Text>
    //       </View>
    //       <View style={{ flexDirection: "column", alignItems: "center" }}>
    //         <Text style={styles.date}>Time</Text>
    //         <Text style={styles.time}>
    //           {item.time.toDate().toLocaleTimeString()}
    //         </Text>
    //       </View>
    //     </View>
    //     <View style={styles.desc}>
    //       <Text style={styles.descHead}>Description</Text>
    //       <Text style={styles.descContent}>{item.description}</Text>
    //     </View>
    //     <View style={styles.desc}>
    //       <Text style={styles.descHead}>Location</Text>
    //       <Text style={styles.descContent}>{item.venue}</Text>
    //     </View>

    //     <View style={styles.desc}>
    //       <Text style={styles.descHead}>Club/Organizer</Text>
    //       <Text style={styles.descContent}>{item.clubName}</Text>
    //     </View>
    //   </View>
    //   <TouchableOpacity onPress={handleRegisterPress}>
    //     <View style={styles.registerButton}>
    //       <Text style={styles.registerButtonText}>Register for Event</Text>
    //     </View>
    //   </TouchableOpacity>
    //   <TouchableOpacity onPress={() => navigation.navigate("Tab")}>
    //     <View style={{ alignItems: "center", marginBottom: 60 }}>
    //       <Text
    //         style={{
    //           backgroundColor:'#FCCD00',
    //           fontFamily:'Convergence',
    //           borderWidth: 1,
    //           padding: 13,
    //           borderRadius: 10,
    //         }}
    //       >
    //         Back
    //       </Text>
    //     </View>
    //   </TouchableOpacity>
    // </ScrollView>
    <View style={styles.container}>
      <Image source={{ uri: item.imageURL }} style={styles.eventImage} />
      {/* <View style={styles.eventInfo}> */}
      <View style={styles.nameCnt}>
        <Text style={styles.eventname}>{item.eventName}</Text>
      </View>
      <View style={styles.abtNotfHeader}>
        <TouchableOpacity
          onPress={() => {
            setTab("Abt");
          }}
        >
          <Text
            style={[
              {
                backgroundColor: tab === "Abt" ? "#283F4D" : "transparent",
              },
              styles.abtNotfHeaderTxt,
            ]}
          >
            About
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setTab("Notf");
          }}
        >
          <Text
            style={[
              {
                backgroundColor: tab === "Notf" ? "#283F4D" : "transparent",
              },
              styles.abtNotfHeaderTxt,
            ]}
          >
            Notification
          </Text>
        </TouchableOpacity>
      </View>
      {tab === "Abt" ? (
        <ScrollView>
          <View style={{ paddingBottom: 50 }}>
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
                  backgroundColor: "#FCCD00",
                  fontFamily: "Convergence",
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
      ) : (
        <FlatList
          data={item.notifications}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderNotification}
          style={styles.notificationContainer}
        />
      )}
      {/* </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: "#102733",
  },
  abtNotfHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: 50,
  },
  abtNotfHeaderTxt: {
    fontFamily: "TekoMedium",
    fontSize: 25,
    padding: 10,
    paddingHorizontal: 55,
    borderBottomColor: "#FCCD00",
    borderBottomWidth: 1,
    borderRadius: 8,
    color: "#A9B2B6",
  },
  notificationContainer: {
    marginVertical: 30,
  },
  notificationCard: {
    backgroundColor: "#283F4D",
    margin: 10,
    padding: 15,
    borderRadius: 10,
  },
  notificationCardText: {
    color: "#A9B2B6",
    fontSize: 26,
    fontFamily: "Teko",
  },
  notificationCardDate: {
    color: "#A9B2B6",
    fontSize: 14,
    fontFamily: "Teko",
    marginTop: 5,
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
    backgroundColor: "#FCCD00",
  },
  registerButtonText: {
    color: "#000000",
    fontSize: 16,
    fontFamily: "Convergence",
  },
});

export default DetailScreenStudent;
