
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ProviderHomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Service Management Dashboard</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ManageRequests')}>
        <Text style={styles.buttonText}>Manage Requests</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ManageBookings')}>
        <Text style={styles.buttonText}>Manage Bookings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PaymentHistory')}>
        <Text style={styles.buttonText}>Payment History</Text>
      </TouchableOpacity>
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
    marginBottom: 30,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default ProviderHomeScreen;
