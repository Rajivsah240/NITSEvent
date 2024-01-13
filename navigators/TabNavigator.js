import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screen/HomeScreen";
import EventScreen from "../screen/EventScreen";
import ProfileScreen from "../screen/ProfileScreen";

// import CustomIcon from "../components/CustomIcon";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        // tabBarBackground: () => (
        //   <BlurView
        //     overlayColor=""
        //     blurAmount={15}
        //     style={styles.BlurViewStyles}
        //   />
        // ),
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            // <Ionicons name="home" size={25} color="red" />
            <AntDesign name="home" size={24} color={focused?"yellow":"red"} />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Events"
        component={EventScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <SimpleLineIcons name="event" size={24} color={focused?"yellow":"red"} />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign name="user" size={24} color={focused?"yellow":"red"} />
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 60,
    position: "absolute",
    backgroundColor: "rgba(12,15,20,0.5)",
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: "transparent",
    marginHorizontal:50,
    marginBottom:30,
    borderRadius:25
  },
  //   BlurViewStyles: {
  //     position: 'absolute',
  //     top: 0,
  //     bottom: 0,
  //     left: 0,
  //     right: 0,
  //   },
});

export default TabNavigator;
