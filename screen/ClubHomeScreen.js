import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import HeaderBar from '../components/HeaderBar';

const ClubHomeScreen = ({navigation}) => {
  const [showAddEvent, setShowAddEvent] = useState(false);

  const handleAddEventPress = () => {
    setShowAddEvent(!showAddEvent);
  };

  const handleAddEvent=()=>{
    navigation.navigate("EventAdd");
  }

  return (
    <View style={styles.container}>
      <HeaderBar />
      {showAddEvent && (
        <TouchableOpacity style={styles.addButton} onPress={handleAddEvent}>
          <Text style={styles.addEventText}>Add an Event</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.floatingButton} onPress={handleAddEventPress}>
        <Text style={styles.buttonText}>{showAddEvent ? '  x  ' : '  +  '}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: '#96bcfa',
    padding: 10,
    borderRadius: 5,
  },
  addEventText: {
    color: 'white',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 25,
    right: 20,
    backgroundColor: '#96bcfa',
    padding: 15,
    borderRadius: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ClubHomeScreen;
