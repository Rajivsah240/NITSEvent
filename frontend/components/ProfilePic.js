import React from 'react';
import {StyleSheet, Image, View} from 'react-native';


const ProfilePic = () => {
  return (
    <View style={styles.ImageContainer}>
      <Image
        source={require('../assets/images/avatar.jpg')}
        style={styles.Image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ImageContainer: {
    height: 36,
    width: 36,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#21262E',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  Image: {
    height: 36,
    width: 36,
  },
});

export default ProfilePic;