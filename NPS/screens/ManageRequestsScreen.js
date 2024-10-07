// screens/ManageRequestsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { getRequests } from '../services/requestService'; // Assuming this service fetches requests

const ManageRequestsScreen = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch requests from backend (e.g., Firebase)
    getRequests().then((data) => setRequests(data));
  }, []);

  const renderRequest = ({ item }) => (
    <View style={styles.requestCard}>
      <Text>{item.firstName} {item.lastName} - {item.paymentType}</Text>
      <TouchableOpacity style={styles.actionButton} onPress={() => approveRequest(item.id)}>
        <Text style={styles.buttonText}>Approve</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton} onPress={() => declineRequest(item.id)}>
        <Text style={styles.buttonText}>Decline</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Requests</Text>
      <FlatList
        data={requests}
        renderItem={renderRequest}
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
  requestCard: {
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

export default ManageRequestsScreen;
