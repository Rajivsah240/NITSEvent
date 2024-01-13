import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screen/HomeScreen";
import EventScreen from "../screen/EventScreen";
import ProfileScreen from "../screen/ProfileScreen";

// import CustomIcon from "../components/CustomIcon";
import { Ionicons } from "@expo/vector-icons";


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        // headerShown: false,
        tabBarShowLabel: true,
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
            <Ionicons name="md-checkmark-circle" size={25} color="green" />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Events"
        component={EventScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="md-checkmark-circle" size={25} color="green" />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="md-checkmark-circle" size={25} color="green" />
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
