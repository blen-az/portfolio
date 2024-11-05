
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { fetchRequests, updateRequestStatus } from '../services/requestService';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ManageRequestsScreen = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    const fetchedRequests = await fetchRequests();
    setRequests(fetchedRequests);
    setLoading(false);
  };

  const handleApprove = async (id) => {
    await updateRequestStatus(id, 'Approved');
    Alert.alert('Request Approved');
    loadRequests();
  };

  const handleDecline = async (id) => {
    await updateRequestStatus(id, 'Declined');
    Alert.alert('Request Declined');
    loadRequests();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ea" />
        <Text style={styles.loadingText}>Loading Requests...</Text>
      </View>
    );
  }

  const renderRequestItem = ({ item }) => (
    <View style={styles.requestItem}>
      <View style={styles.textContainer}>
        <Text style={styles.requestText}>Name: {item.firstName} {item.lastName}</Text>
        <Text style={styles.requestText}>Type: {item.paymentType}</Text>
        <Text style={styles.requestText}>Social Media Link: {item.socialMediaLink || 'N/A'}</Text>
        <Text style={styles.requestText}>Notes: {item.notes}</Text>
        <Text style={styles.statusText}>Status: {item.status || 'Pending'}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.approveButton]} onPress={() => handleApprove(item.id)}>
          <Icon name="check-circle" size={24} color="#fff" />
          <Text style={styles.buttonText}>Approve</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.declineButton]} onPress={() => handleDecline(item.id)}>
          <Icon name="cancel" size={24} color="#fff" />
          <Text style={styles.buttonText}>Decline</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={requests}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
      renderItem={renderRequestItem}
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
  requestItem: {
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
  requestText: {
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
  declineButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 5,
  },
});

export default ManageRequestsScreen;
