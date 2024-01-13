import { StyleSheet, Text, View } from 'react-native'
import GradientBGIcon from './GradientBGIcon';
import ProfilePic from './ProfilePic';

const HeaderBar = () => {
  return (
    <View style={styles.HeaderContainer}>
      <GradientBGIcon
        name="menu"
        color='#52555A'
        size='12'
      />
      <Text style={styles.HeaderText}>NITS Event</Text>
      <ProfilePic />
    </View>
  )
}

const styles = StyleSheet.create({
    HeaderContainer: {

      paddingBottom:30,
      paddingLeft:30,
      paddingRight:30,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    HeaderText: {
      
      fontSize: 30,
      color: 'black',
    },
  });
export default HeaderBar