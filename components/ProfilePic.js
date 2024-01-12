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
    height: 26,
    width: 26,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#21262E',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  Image: {
    height: 26,
    width: 26,
  },
});

export default ProfilePic;