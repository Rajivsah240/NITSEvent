import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './navigators/TabNavigator';
import ProfileScreen from './screen/ProfileScreen';
import EventScreen from './screen/EventScreen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView,StyleSheet } from 'react-native';

// import SplashScreen from 'react-native-splash-screen';

const Stack = createNativeStackNavigator();

const App = () => {
  // useEffect(() => {
  //   SplashScreen.hide();
  // }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar/>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Tab"
          component={TabNavigator}
          options={{animation: 'slide_from_bottom'}}></Stack.Screen>
        <Stack.Screen
          name="Events"
          component={EventScreen}
          options={{animation: 'slide_from_bottom'}}></Stack.Screen>
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{animation: 'slide_from_bottom'}}></Stack.Screen>
      </Stack.Navigator>
      
    </NavigationContainer>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:25,
    backgroundColor:'#f0e5d8',
  },
});

export default App;
