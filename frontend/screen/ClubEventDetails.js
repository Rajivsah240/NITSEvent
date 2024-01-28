import { React, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import * as Font from "expo-font";
import { customFonts } from "../Theme";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const ClubEventDetails = ({ navigation, route }) => {
  const { item } = route.params;
  const [tab, setTab] = useState("Abt");
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [editEvent, setEditEvent] = useState(false);
  const [editNotification, setEditNotification] = useState(false);


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

  const handleNotificationPress = () => {
    setEditNotification(!editNotification);
  };

  const handleNotificationEvent = () => {
    navigation.navigate("EventNotificationEditScreen", { eventId: item.id });
  };

  const handleEditEventPress = () => {
    setEditEvent(!editEvent);
  };

  const handleEditEvent = () => {
    navigation.navigate("ModifyEventScreen", { item });
    console.log(item.id);
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
    <>
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
    {editEvent && (
        <TouchableOpacity style={styles.editButton} onPress={handleEditEvent}>
          <Text style={styles.editEventText}>Modify Event</Text>
        </TouchableOpacity>
      )}
      {editNotification && (
        <TouchableOpacity
          style={styles.editButton}
          onPress={handleNotificationEvent}
        >
          <Text style={styles.editEventText}>Post Notification</Text>
        </TouchableOpacity>
      )}

      {tab === "Abt" ? (
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={handleEditEventPress}
        >
          <Text style={styles.buttonText}>
            <Feather name="edit" size={15} color="black" />
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={handleNotificationPress}
        >
          <Text style={styles.buttonText}>
            <Entypo name="notification" size={15} color="black" />
          </Text>
        </TouchableOpacity>
      )}
    </>
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
    marginTop: 10,
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
  editButton: {
    position: "absolute",
    bottom: 80,
    right: 20,
    backgroundColor: "#96bcfa",
    padding: 10,
    borderRadius: 5,
  },
  editEventText: {
    color: "white",
  },
  floatingButton: {
    position: "absolute",
    bottom: 25,
    right: 20,
    backgroundColor: "#96bcfa",
    padding: 15,
    borderRadius: 50,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
export default ClubEventDetails;
