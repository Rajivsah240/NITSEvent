import {React,useState} from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Title, Caption, Drawer, Text, TouchableRipple, Switch } from 'react-native-paper';

const ProfileScreen = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    // Toggle your app's theme (you need to implement this logic)
    setIsDarkTheme(!isDarkTheme);
  };
  return (
    <View style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: 'row', marginTop: 15 }}>
          <Avatar.Image
            source={require('../assets/images/avatar.jpg')}
            size={80}
          />
          <View style={{ marginLeft: 20 }}>
            <Title style={[styles.title, { marginTop: 15, marginBottom: 5 }]}>
              Rajiv Sah
            </Title>
            <Caption style={styles.caption}>@rajiv_sah_01</Caption>
          </View>
        </View>
      </View>
      {/* Box for Events Registered and Events Attended */}
      <View style={styles.eventBox}>
        <View style={styles.eventItem}>
          <Text style={styles.eventLabel}>Events Registered</Text>
          <Text style={styles.eventCount}>5</Text>
        </View>
        <View style={styles.eventItem}>
          <Text style={styles.eventLabel}>Events Attended</Text>
          <Text style={styles.eventCount}>4</Text>
        </View>
      </View>
      <Drawer.Section style={styles.drawerSection} title='General' titleStyle={styles.drawerTitle}>
        <TouchableRipple onPress={() => console.log('Navigate to Dashboard')}>
          <View style={styles.drawerItem}>
            <Text>Registered Events</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple onPress={() => console.log('Navigate to Settings')}>
          <View style={styles.drawerItem}>
            <Text>Log Out</Text>
          </View>
        </TouchableRipple>
      </Drawer.Section>

      {/* Dark Mode Toggle */}
      {/* <Drawer.Section title="Preferences">
        <TouchableRipple onPress={toggleTheme}>
          <View style={styles.preference}>
            <Text>Dark Theme</Text>
            <Switch value={isDarkTheme} onValueChange={toggleTheme} />
          </View>
        </TouchableRipple>
      </Drawer.Section> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#f0e5d8'
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    color: '#999',
  },
  drawerSection: {
    marginTop: 15,
  },
  drawerItem: {
    
    // alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },

  eventBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    marginHorizontal:15,
    padding: 10,
    marginVertical: 10,
    borderRadius: 25
  },

  eventItem: {
    alignItems: 'center',
  },

  eventLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },

  eventCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0066cc', // or your preferred color
  },
  drawerTitle: {
    fontSize: 25, // Adjust the font size as needed
    fontWeight: 'bold',
    color: '#333', // Set your preferred color
  },
});

export default ProfileScreen;
