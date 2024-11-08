import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { lightTheme } from './Theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen = () => {
  const { user, logout } = useContext(AuthContext);
  const navigation = useNavigation(); // Initialize navigation

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: lightTheme.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 20 }}>
          <Icon name="arrow-back" size={28} color={lightTheme.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: lightTheme.text }]}>Profile</Text>
      </View>

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    justifyContent: 'flex-start', // Align items in the header properly
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
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
