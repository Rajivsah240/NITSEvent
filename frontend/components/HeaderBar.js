import { useState,useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import GradientBGIcon from './GradientBGIcon';
import ProfilePic from './ProfilePic';
import { useAuth } from '../AuthContext';
const HeaderBar = ({ onSignOut }) => {
  const [showSignout, setShowSignout] = useState(false);
  const {logout,loggedIn,user} = useAuth();

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
      <GradientBGIcon
        name="menu"
        color='#cbfff4'
        size='15'
      />
      <Text style={styles.HeaderText}>NitS Event</Text>
      <TouchableOpacity onPress={handleProfilePress}>
        <ProfilePic />
      </TouchableOpacity>
      {showSignout && (
        <TouchableOpacity style={styles.SignoutBtn} onPress={handleSignoutPress}>
          <Text style={styles.SignoutText}>Sign Out</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
    HeaderContainer: {
      backgroundColor:'#282c32',
      paddingVertical:20,
      paddingLeft:30,
      paddingRight:30,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomRightRadius:50,
      borderBottomLeftRadius:50,
      marginTop:StatusBar.currentHeight
    },
    HeaderText: {
      fontSize: 30,
      color: '#f8f8f8',
      fontWeight:'500',
      letterSpacing:5
      // fontFamily:''
    },
    SignoutBtn: {
      position: 'absolute',
      top: 80,
      right: 20,
      backgroundColor: '#96bcfa',
      padding: 10,
      borderRadius: 5,
    },
    SignoutText: {
      color: '#f8f8f8',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
export default HeaderBar