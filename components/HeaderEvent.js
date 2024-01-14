import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
// import { useFonts } from "expo-font";
const HeaderEvent = () => {
  // const [fontsLoaded] = useFonts({
  //   'Convergence-Regular': require('../assets/fonts/Convergence-Regular.ttf'),
  // })
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/Tecnoesis2.jpg')}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.eventName}>TECNOESIS</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#f4f5ff',
    height: 300,
    marginHorizontal:10,
    marginVertical:30,
    borderRadius:15,
    borderWidth: 1,
    borderColor: '#feffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 15,

  },
  image: {
    width: '95%',
    height: '85%',
    borderBottomLeftRadius:5,
    borderBottomRightRadius:5,
    borderTopLeftRadius:15,
    borderTopRightRadius:15,
    marginVertical:5
  },
  eventName:{
    fontSize:24,
    fontWeight:'bold',
    color:'#5F5F63',
    // fontFamily:'Convergence-Regular'
    
    
  }
});

export default HeaderEvent;
