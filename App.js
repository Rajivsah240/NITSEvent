import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './navigators/TabNavigator';
import ProfileScreen from './screen/ProfileScreen';
import EventScreen from './screen/EventScreen';
// import SplashScreen from 'react-native-splash-screen';

const Stack = createNativeStackNavigator();

const App = () => {
  // useEffect(() => {
  //   SplashScreen.hide();
  // }, []);
  return (
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
  );
};



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor:'#f0e5d8'
//     // Define any styles for your container if needed
//     // For example:
//     // justifyContent: 'center',
//     // alignItems: 'center',
//   },
// });

export default App;
