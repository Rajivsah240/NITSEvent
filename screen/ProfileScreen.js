import { React, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
const ProfileScreen = ({navigation}) => {
  
  const handleLogin = () => {
    navigation.navigate("WelcomeScreen");
    console.log("Login pressed");
  };
  return (
    <View style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Avatar.Image
            source={require("../assets/images/avatar.jpg")}
            size={80}
          />
          <View style={{ marginLeft: 20 }}>
            <Title style={[styles.title, { marginTop: 15, marginBottom: 5 }]}>
              Rajiv Sah
            </Title>
            <Caption style={styles.caption}>@rajiv_sah_01</Caption>
          </View>
        </View>
      </View>
      {/* Box for Events Registered and Events Attended */}
      <View style={styles.eventBox}>
        <View style={styles.eventItem}>
          <Text style={styles.eventLabel}>Events Registered</Text>
          <Text style={styles.eventCount}>5</Text>
        </View>
        <View style={styles.eventItem}>
          <Text style={styles.eventLabel}>Events Attended</Text>
          <Text style={styles.eventCount}>4</Text>
        </View>
      </View>
      <Drawer.Section
        style={styles.drawerSection}
      >
        <TouchableRipple onPress={() => console.log("Navigate to Dashboard")}>
          <View style={styles.drawerItem}>
            <MaterialIcons name="event-note" size={35} color="black" />
            <Text style={styles.drawerItemText}>Registered Events</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple onPress={handleLogin}>
          <View style={styles.drawerItem}>
            <Feather name="log-out" size={35} color="black" />
            <Text style={styles.drawerItemText}>Log Out</Text>
          </View>
        </TouchableRipple>
      </Drawer.Section>

      {/* Dark Mode Toggle */}
      {/* <Drawer.Section title="Preferences">
        <TouchableRipple onPress={toggleTheme}>
          <View style={styles.preference}>
            <Text>Dark Theme</Text>
            <Switch value={isDarkTheme} onValueChange={toggleTheme} />
          </View>
        </TouchableRipple>
      </Drawer.Section> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f5ff",
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    color: "#999",
  },
  drawerSection: {
    marginTop: 15,
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  drawerItemText: {
    paddingLeft: 5,
    fontSize:18
  },

  eventBox: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#f0e5d8",
    marginHorizontal: 15,
    padding: 10,
    marginVertical: 10,
    borderRadius: 25,
  },

  eventItem: {
    alignItems: "center",
  },

  eventLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },

  eventCount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0066cc"
  },
  drawerTitle: {
    fontSize: 35,
    fontWeight: "bold",
    color: "white",
  },
});

export default ProfileScreen;
