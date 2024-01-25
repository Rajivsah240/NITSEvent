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
import ClubSignUpScreen from './screen/ClubSignUpScreen';
import SignUpScreen from './screen/SignUpScreen';

import { AuthProvider } from './AuthContext';
import DetailScreenStudent from './screen/DetailScreenStudent';
import EventRegistrationScreen from './screen/EventRegistrationScreen';
import RegisteredEvents from './screen/RegisteredEvents';
import ClubDetails from './screen/ClubDetails';
import Clubs from './components/Clubs';
import ClubEventDetails from './screen/ClubEventDetails';
import ModifyEventScreen from './screen/ModifyEventScreen';
import EventNotificationEditScreen from './screen/EventNotificationEditScreen';



const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <SafeAreaView style={styles.container}>
    <AuthProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen" screenOptions={{headerShown: false}}>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen}/>
        <Stack.Screen name="LoginSignUp" component={LoginSignUp}/>
        <Stack.Screen name="SignUpScreen" component={SignUpScreen}/>
        <Stack.Screen name="LoginScreen" component={LoginScreen}/>
        <Stack.Screen name="EventScreen" component={EventScreen}/>
        <Stack.Screen name="ClubDetails" component={ClubDetails}/>
        <Stack.Screen name="EventRegistrationScreen" component={EventRegistrationScreen}/>
        <Stack.Screen name="DetailScreenStudent" component={DetailScreenStudent} />
        <Stack.Screen name="ClubSignUpScreen" component={ClubSignUpScreen}/>
        <Stack.Screen name="RegisteredEvents" component={RegisteredEvents}/>
        <Stack.Screen name='ClubLogin' component={ClubLogin}/>
        <Stack.Screen name='ClubHomeScreen' component={ClubHomeScreen}/>
        <Stack.Screen name='EventAdd' component={EventAdd}/>
        <Stack.Screen name="ClubEventDetails" component={ClubEventDetails}/>
        <Stack.Screen name="ModifyEventScreen" component={ModifyEventScreen}/>
        <Stack.Screen name="EventNotificationEditScreen" component={EventNotificationEditScreen}/>
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
    </AuthProvider>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop:10,
    backgroundColor:'#f4f5ff',
  },
});

export default App;
