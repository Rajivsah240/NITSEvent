import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './navigators/TabNavigator';
import ProfileScreen from './screen/ProfileScreen';
import EventScreen from './screen/EventScreen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView,StyleSheet } from 'react-native';
import LinearGradient from 'expo-linear-gradient';
import WelcomeScreen from './screen/WelcomeScreen';
import LoginScreen from './screen/LoginScreen';
import LoginSignUp from './screen/LoginSignUp';
import ClubLogin from './screen/ClubLogin';
import ClubHomeScreen from './screen/ClubHomeScreen';
import EventAdd from './screen/EventAdd';



const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar hidden={true}/> */}
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen" screenOptions={{headerShown: false}}>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen}/>
        <Stack.Screen name="LoginSignUp" component={LoginSignUp}/>
        <Stack.Screen name="LoginScreen" component={LoginScreen}/>
        <Stack.Screen name='ClubLogin' component={ClubLogin}/>
        <Stack.Screen name='ClubHomeScreen' component={ClubHomeScreen}/>
        <Stack.Screen name='EventAdd' component={EventAdd}/>
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
    // paddingTop:25,
    backgroundColor:'#f4f5ff',
  },
});

export default App;
