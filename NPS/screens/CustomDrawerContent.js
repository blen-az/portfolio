// components/CustomDrawer.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { AuthContext } from '../context/AuthContext';

const CustomDrawer = (props) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      <View style={styles.profileSection}>
        <Text style={styles.username}>{user?.username || 'User'}</Text>
        <Text style={styles.email}>{user?.email || 'user@example.com'}</Text>
      </View>
      <DrawerItem
        label="Logout"
        onPress={logout}
        labelStyle={styles.logoutLabel}
        icon={() => <Text>🚪</Text>} // Icon or image can be added here
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileSection: {
    padding: 20,
    backgroundColor: '#f4f4f4',
    marginBottom: 20,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  logoutLabel: {
    fontSize: 16,
    color: '#333',
  },
});

export default CustomDrawer;
