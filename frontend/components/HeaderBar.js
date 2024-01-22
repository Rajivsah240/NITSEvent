import { StatusBar, StyleSheet, Text, View } from 'react-native'
import GradientBGIcon from './GradientBGIcon';
import ProfilePic from './ProfilePic';

const HeaderBar = () => {
  return (
    <View style={styles.HeaderContainer}>
      <GradientBGIcon
        name="menu"
        color='#cbfff4'
        size='15'
      />
      <Text style={styles.HeaderText}>NitS Event</Text>
      <ProfilePic />
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
  });
export default HeaderBar