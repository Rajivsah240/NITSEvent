import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

const LoginSignUp = ({navigation}) => {
    const handleStudentSignin=()=>{
        navigation.replace("LoginScreen");
    }

    const handleClubSignin=()=>{
        navigation.navigate("ClubLogin");
    }

  
    return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleClubSignin} style={styles.button}>
        <Text style={styles.buttonText}>Club Secretary</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleStudentSignin} style={styles.button}>
        <Text style={styles.buttonText}>Student</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default LoginSignUp;
