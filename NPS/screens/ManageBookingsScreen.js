// screens/ManageBookingsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { getBookings } from '../services/bookingService'; // Assuming this service fetches bookings

const ManageBookingsScreen = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch bookings from backend (e.g., Firebase)
    getBookings().then((data) => setBookings(data));
  }, []);

  const renderBooking = ({ item }) => (
    <View style={styles.bookingCard}>
      <Text>{item.firstName} {item.lastName} - {item.paymentType} on {item.date}</Text>
      <TouchableOpacity style={styles.actionButton} onPress={() => markAsCompleted(item.id)}>
        <Text style={styles.buttonText}>Mark as Completed</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Bookings</Text>
      <FlatList
        data={bookings}
        renderItem={renderBooking}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  bookingCard: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 10,
  },
  actionButton: {
    marginTop: 10,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
});

export default ManageBookingsScreen;
