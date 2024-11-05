
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { lightTheme } from './Theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <View style={[styles.container, { backgroundColor: lightTheme.background }]}>
      <Text style={[styles.title, { color: lightTheme.primary }]}>Your Profile</Text>

      {user ? (
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Icon name="person" size={24} color={lightTheme.primary} />
            <Text style={styles.label}>Username</Text>
            <Text style={styles.info}>{user.username}</Text>
          </View>

          <View style={styles.card}>
            <Icon name="email" size={24} color={lightTheme.primary} />
            <Text style={styles.label}>Email</Text>
            <Text style={styles.info}>{user.email}</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.loadingText}>Loading user data...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  cardContainer: {
    width: '100%',
    paddingHorizontal: 15,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: lightTheme.secondary,
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    color: '#888',
    marginLeft: 10,
  },
  info: {
    fontSize: 18,
    color: lightTheme.text,
    fontWeight: '500',
    marginLeft: 'auto',
  },
  logoutButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: lightTheme.primary,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  loadingText: {
    fontSize: 16,
    color: lightTheme.text,
  },
});

export default ProfileScreen;
