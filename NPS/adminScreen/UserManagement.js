// adminScreen/UserManagement.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserManagement = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Management</Text>
      {/* Logic for managing users will go here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
});

export default UserManagement;
