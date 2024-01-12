import { StyleSheet, Text, View } from 'react-native'
import GradientBGIcon from './GradientBGIcon';
import ProfilePic from './ProfilePic';

const HeaderBar = () => {
  return (
    <View style={styles.HeaderContainer}>
      <GradientBGIcon
        name="menu"
        color='#52555A'
        size='8'
      />
      <Text style={styles.HeaderText}>Hii!</Text>
      <ProfilePic />
    </View>
  )
}

const styles = StyleSheet.create({
    HeaderContainer: {
      padding: 30,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    HeaderText: {
      
      fontSize: 10,
      color: '#FFFFFF',
    },
  });
export default HeaderBar