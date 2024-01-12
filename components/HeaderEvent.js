import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const HeaderEvent = () => {
    
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/Tecnoesis2.jpg')}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.eventName}>Tecnoesis</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'transparent',
    height: 150,
    marginBottom:50

  },
  image: {
    width: '90%',
    height: '100%',
    borderRadius:25
  },
  eventName:{
    fontSize:26,
    
  }
});

export default HeaderEvent;
