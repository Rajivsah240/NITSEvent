import { useState,useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import GradientBGIcon from './GradientBGIcon';
import ProfilePic from './ProfilePic';
import { useAuth } from '../AuthContext';
import * as Font from "expo-font";

const HeaderBar = ({ onSignOut }) => {
  const [showSignout, setShowSignout] = useState(false);
  const {logout,loggedIn,user} = useAuth();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  
  const name = user ? user.name : '';
  const email = user ? user.email : '';

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

  const handleProfilePress = () => {
    setShowSignout(!showSignout);
  };


  const handleSignoutPress =async () => {
    await logout();
    // Trigger the callback to navigate to WelcomeScreen
    onSignOut();
  };
  return (
    <View style={styles.HeaderContainer}>
      <TouchableOpacity onPress={handleProfilePress}>
        <ProfilePic />
      </TouchableOpacity>
      <Text style={styles.HeaderText}>Hello, {name} !</Text>
      <GradientBGIcon
        name="menu"
        color='#A9B2B6'
        size='15'
      />
      {showSignout && (
        <TouchableOpacity style={styles.SignoutBtn} onPress={handleSignoutPress}>
          <Text style={styles.SignoutText}>Sign Out</Text>
        </TouchableOpacity>
      )}
      <StatusBar showHideTransition={'slide'}/>
    </View>
  )
}

const styles = StyleSheet.create({
    HeaderContainer: {
      backgroundColor:'#faf8f7',
      paddingVertical:10,
      paddingLeft:30,
      paddingRight:30,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomRightRadius:15,
      borderBottomLeftRadius:15,
      // marginTop:StatusBar.currentHeight
    },
    HeaderText: {
      fontSize: 25,
      color: '#000000',
      letterSpacing:3,
      fontFamily:'TekoSemiBold'
    },
    SignoutBtn: {
      position: 'absolute',
      top: 60,
      right: 20,
      backgroundColor: '#FCCD00',
      padding: 10,
      borderRadius: 5,
    },
    SignoutText: {
      color: '#000000',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
export default HeaderBar