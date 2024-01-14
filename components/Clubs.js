import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { FlatList } from "react-native";

const Clubs = () => {
  const clubImages = [
    // Add URLs or local paths of your club images here
    require("../assets/images/club1.jpg"),
    require("../assets/images/club2.png"),
    require("../assets/images/club3.jpg"),
    require("../assets/images/club4.png"),
    require("../assets/images/club5.png"),
    // Add more images as needed
  ];
  const renderClubImage = ({ item }) => (
    <View style={styles.clubImageContainer}>
      <Image source={item} style={styles.clubImage} />
      <Text style={styles.clubText}>Club</Text>
    </View>
  );
  return (
    <View>
      <Text style={styles.text}>Clubs</Text>
      <View style={styles.container}>
      <FlatList
        data={clubImages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderClubImage}
        numColumns={3}
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    paddingLeft: 12,
    paddingBottom: 12,
    fontWeight: "bold",
  },
  container: {
    alignItems:"center",
  },
  clubImageContainer: {
    borderColor:'red',
    flexDirection: "column",
    alignItems: 'center',
    flexWrap: "wrap",
    marginVertical: 10,
    paddingHorizontal:20
  },
  clubImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 10,    
  },
  clubText:{
    color: "#598714",
    // paddingLeft:20
  }
});
export default Clubs;
