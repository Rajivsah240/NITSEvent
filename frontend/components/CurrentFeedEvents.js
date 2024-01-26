import { StyleSheet, Text, View, Image,TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { parseISO, format } from "date-fns";

import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import * as Font from "expo-font";
import { Avatar, Divider } from "react-native-paper";

import { FIRESTORE_DB } from "../config/firebase";
import { collection, getDocs, where, query } from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";

const CurrentFeedEvents = ({ event }) => {
  const [clubDetails, setClubDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const eventDate = event.date ? event.date.toDate() : null;
  const eventTime = event.time ? event.time.toDate() : null;

  const formattedDate = eventDate ? format(eventDate, "MMMM dd, yyyy") : "";
  const formattedTime = eventTime ? format(eventTime, "hh:mm a") : "";
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  let customFonts = {
    Convergence: require("../assets/fonts/Convergence-Regular.ttf"),
    Monoton: require("../assets/fonts/Monoton-Regular.ttf"),
    Teko: require("../assets/fonts/Teko-VariableFont_wght.ttf"),
    TekoLight: require("../assets/fonts/Teko-Light.ttf"),
    TekoSemiBold: require("../assets/fonts/Teko-SemiBold.ttf"),
    TekoMedium: require("../assets/fonts/Teko-Medium.ttf"),
  };
  const loadFontsAsync = async () => {
    await Font.loadAsync(customFonts);
    setFontsLoaded(true);
  };

  const fetchClubDetails = async () => {
    try {
      const clubsCollectionRef = collection(FIRESTORE_DB, "clubUsers");
      const q = query(clubsCollectionRef, where("uid", "==", event.uid));
      const querySnapshot = await getDocs(q);

      const clubDetailsArray = [];

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          clubDetailsArray.push(doc.data());
        });

        // Assuming you want to set an array of club details
        setClubDetails(clubDetailsArray);
        console.log("Club detail", clubDetails);
        console.log(event.uid);
      }
    } catch (error) {
      console.error("Error fetching club details: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadFontsAsync();
      await fetchClubDetails();
    };

    fetchData();
  }, []);
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const linesToShow = showFullDescription
    ? event.description.split(".")
    : event.description.split(".").slice(0, 1);
  if (!fontsLoaded) {
    return null;
  }

  //   useFocusEffect(
  //     React.useCallback(() => {
  //       loadFontsAsync();
  //       fetchClubDetails()
  //     }, [event])
  //   );

  if (!fontsLoaded || loading) {
    // Return a loading indicator or null
    return <Text>Loading</Text>; // You can create a LoadingIndicator component
  }

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <Avatar.Image size={55} source={{ uri: clubDetails[0].imageURL }} />
        <View style={styles.clubDtls}>
          <Text style={styles.avatarClubName}>{clubDetails[0].clubName}</Text>
          <Text style={styles.postDateTime}>
            {event.timePosted
              ? format(event.timePosted.toDate(), "hh:mm a")
              : ""}
            {"  "}
            {event.dayPosted
              ? format(event.dayPosted.toDate(), "MMMM dd, yyyy")
              : ""}
          </Text>
        </View>
      </View>
      <View style={styles.eventDescription}>
        {linesToShow.map((line, index) => (
          <Text style={styles.eventDescriptionTxt} key={index}>{line}</Text>
        ))}
        {!showFullDescription && (
          <TouchableOpacity onPress={toggleDescription}>
            <Text style={styles.readMore}>Read More</Text>
          </TouchableOpacity>
        )}
        {showFullDescription && (
          <TouchableOpacity onPress={toggleDescription}>
            <Text style={styles.readMore}>Read Less</Text>
          </TouchableOpacity>
        )}

      </View>
      <Image
        source={{ uri: event.imageURL }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.eventDetails}>
        <View style={styles.eventDateTime}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome5 name="calendar-alt" size={15} color="#000000" />
            <Text
              style={{
                fontSize: 15,
                color: "#000000",
                paddingLeft: 7,
                fontFamily: "TekoMedium",
                paddingTop: 2,
              }}
            >
              {formattedDate}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Feather name="watch" size={15} color="#000000" />
            <Text
              style={{
                fontSize: 15,
                color: "#000000",
                paddingLeft: 7,
                fontFamily: "TekoMedium",
                paddingTop: 2,
              }}
            >
              {formattedTime}
            </Text>
          </View>
        </View>
        <View style={styles.eventDateTime}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <EvilIcons name="location" size={15} color="#000000" />
            <Text
              style={{
                fontSize: 15,
                color: "#000000",
                paddingLeft: 7,
                fontFamily: "TekoMedium",
                paddingTop: 2,
              }}
            >
              {event.venue}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Octicons name="organization" size={15} color="#000000" />
            <Text
              style={{
                fontSize: 15,
                color: "#000000",
                paddingLeft: 7,
                fontFamily: "TekoMedium",
                paddingTop: 2,
              }}
            >
              {event.clubName}
            </Text>
          </View>
        </View>
        <Divider style={{ marginVertical: 10 }} horizontalInset={true} />
        <View style={styles.interactSection}>
          <View style={styles.reach}>
            <AntDesign name="areachart" size={20} color="black" />
            <Text> 0</Text>
          </View>
          <View style={styles.reach}>
            <EvilIcons name="comment" size={20} color="black" />
            <Text> 0</Text>
          </View>
          <View style={styles.reach}>
            <Entypo name="heart" size={20} style={{}} color="pink" />
            <Text> 0</Text>
          </View>
          <View>
            <Entypo name="dots-three-vertical" size={22} color="black" />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  //    card: {
  //      marginBottom: 20,
  //      marginHorizontal: 50,
  //      backgroundColor: "#fff",
  //      padding: 10,
  //      borderRadius: 15,

  //    },
  //    cardImage: {
  //      height: 50,
  //      width: 50,
  //      resizeMode: "contain",
  //    },
  //    cardDetails: {
  //      padding: 10,
  //    },
  //    eventName: {
  //      fontSize: 18,
  //      fontWeight: "bold",
  //      marginBottom: 5,
  //    },
  //    dateTime: {
  //      fontSize: 14,
  //      marginBottom: 5,
  //    },
  //    venue: {
  //      fontSize: 14,
  //      color: "#777",
  //    },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  clubDtls: {
    marginLeft: 15,
  },
  avatarClubName: {
    fontSize: 25,
    fontFamily: "TekoLight",
    // marginLeft: 10,
  },
  postDateTime: {
    fontSize: 10,
  },
  eventDescription: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  eventDescriptionTxt:{
    // fontFamily:'Convergence',
    fontSize:11
  },
  readMore: {
    color: "#A9B2B6",
    marginTop: 5,
    fontSize:10
  },
  Image: {
    height: 36,
    width: 36,
  },
  cardContainer: {
    // height: 300,
    //  marginHorizontal: 7,
    width: 300,
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 15,
  },
  image: {
    width: "100%",
    height: 190,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  eventDetails: {
    padding: 10,
  },
  eventDateTime: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  interactSection: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  reach: {
    flexDirection: "row",
  },
});
export default CurrentFeedEvents;
