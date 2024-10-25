
import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const ProfileScreen = () => {
  const { user, logout } = useContext(AuthContext); // Get user data and logout function from AuthContext

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      {/* Display user details */}
      {user ? (
        <>
          <Text style={styles.info}>Username: {user.username}</Text>
          <Text style={styles.info}>Email: {user.email}</Text>
          <Text style={styles.info}>Admin: {user.isAdmin ? 'Yes' : 'No'}</Text>
          <Button title="Logout" onPress={logout} />
        </>
      ) : (
        <Text>Loading user data...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default ProfileScreen;
