import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Title, Caption, Drawer } from 'react-native-paper';

const ProfileScreen = () => {
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

      <Drawer.Section style={styles.drawerSection}>
        {/* Add your drawer items here */}
      </Drawer.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default ProfileScreen;
