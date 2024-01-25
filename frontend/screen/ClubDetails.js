import { React, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as Font from "expo-font";
const ClubDetails = ({ navigation, route }) => {
  const { item } = route.params;
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
  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: item.imageURL }} style={styles.clubImage} />
      <View style={styles.clubInfo}>
        <View style={styles.nameCnt}>
          <Text style={styles.clbname}>{item.clubName}</Text>
        </View>

        <View style={styles.desc}>
          <Text style={styles.descHead}>About</Text>
          <Text style={styles.descContent}>{item.clubDescription}</Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("Tab")}>
        <View style={{ alignItems: "center", marginBottom: 60 }}>
          <Text
            style={{
              backgroundColor:'#FCCD00',
              fontFamily:'Convergence',
              borderWidth: 1,
              padding: 10,
              borderRadius: 10,
            }}
          >
            Back
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: "#102733",
  },
  clubInfo: {
    top: -20,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: "#102733",
  },

  clubImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
    overflow: "hidden",
  },

  clbname: {
    fontSize: 50,
    fontFamily: "TekoMedium",
    marginVertical: 10,
    paddingLeft: 20,
    paddingVertical: 1,
    color:'#A9B2B6'
  },
  
  desc: {
    flexDirection: "column",
    paddingLeft: 20,
    marginVertical: 1,
  },
  descHead: {
    fontSize: 24,
    fontFamily: "TekoSemiBold",
    color:'#A9B2B6'
  },
  descContent: {
    fontSize: 18,
    fontFamily: "Teko",
  },
  
});

export default ClubDetails;
