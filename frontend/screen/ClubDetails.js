import { React, useState, useEffect } from "react";
import {  StyleSheet,  Text,  View,  Image,  TouchableOpacity,  ScrollView,} from "react-native";

const ClubDetails = ({ route }) => {
  const { item } = route.params;
  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: item.imageURL }} style={styles.eventImage} />
      <View style={styles.eventInfo}>
        <View style={styles.nameCnt}>
          <Text style={styles.eventname}>{item.clubName}</Text>
        </View>
        
        <View style={styles.desc}>
          <Text style={styles.descHead}>Description</Text>
          <Text style={styles.descContent}>{item.description}</Text>
        </View>
        
      </View>
      
      {/* <TouchableOpacity onPress={() => navigation.navigate("Tab")}>
        <View style={{ alignItems: "center", marginBottom: 60 }}>
          <Text
            style={{
              borderColor: "red",
              borderWidth: 1,
              padding: 10,
              borderRadius: 10,
            }}
          >
            Back
          </Text>
        </View>
      </TouchableOpacity> */}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 25,
        backgroundColor: "#fff",
      },
      eventInfo: {
        top: -20,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        backgroundColor: "#fff",
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
      },
      desc: {
        flexDirection: "column",
        paddingLeft: 20,
        marginVertical: 10,
      },
      descHead: {
        fontSize: 24,
        fontFamily: "TekoSemiBold",
      },
      descContent: {
        fontSize: 18,
        fontFamily: "Teko",
      },
      registerButton: {
        borderColor: "red",
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        margin: 20,
        alignItems: "center",
      },
      registerButtonText: {
        color: "red",
        fontSize: 16,
      },
});

export default ClubDetails;

