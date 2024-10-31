// NPS/screens/ManageBookingsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { db } from '../firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ManageBookingsScreen = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      const bookingList = [];
      const querySnapshot = await getDocs(collection(db, 'bookings'));

      querySnapshot.forEach((doc) => {
        bookingList.push({ id: doc.id, ...doc.data() });
      });

      setBookings(bookingList);
      setLoading(false);
    };

    fetchBookings();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      const bookingRef = doc(db, 'bookings', id);
      await updateDoc(bookingRef, { status: newStatus });
      alert(`Status updated to ${newStatus}`);
    } catch (error) {
      alert('Error updating status:', error.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ea" />
        <Text style={styles.loadingText}>Loading Bookings...</Text>
      </View>
    );
  }

  const renderBookingItem = ({ item }) => (
    <View style={styles.bookingItem}>
      <View style={styles.textContainer}>
        <Text style={styles.bookingText}>Name: {item.firstName} {item.lastName}</Text>
        <Text style={styles.bookingText}>Booking Type: {item.paymentType}</Text>
        <Text style={styles.bookingText}>Social Media Link: {item.socialMediaLink || 'N/A'}</Text>
        <Text style={styles.bookingText}>Scheduled Date: {new Date(item.date).toLocaleString()}</Text>
        <Text style={styles.statusText}>Status: {item.status || 'Pending'}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          onPress={() => updateStatus(item.id, 'approved')} 
          style={[styles.button, styles.approveButton]}
        >
          <Icon name="check-circle" size={24} color="#fff" />
          <Text style={styles.buttonText}>Approve</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => updateStatus(item.id, 'cancelled')} 
          style={[styles.button, styles.cancelButton]}
        >
          <Icon name="cancel" size={24} color="#fff" />
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={bookings}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
      renderItem={renderBookingItem}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#6200ea',
  },
  listContainer: {
    padding: 15,
  },
  bookingItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  textContainer: {
    marginBottom: 10,
  },
  bookingText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  statusText: {
    fontSize: 16,
    color: '#6200ea',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    width: '48%',
    justifyContent: 'center',
  },
  approveButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 5,
  },
});

export default ManageBookingsScreen;
