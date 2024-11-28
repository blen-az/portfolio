import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, Image, Modal } from 'react-native';
import { fetchRequests, updateRequestStatus } from '../services/requestService';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ManageRequestsScreen = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    setLoading(true);
    const fetchedRequests = await fetchRequests();
    setRequests(fetchedRequests);
    setLoading(false);
  };

  const handleApprove = async (id) => {
    const result = await updateRequestStatus(requests, setRequests, id, 'Approved');
    if (result.success) {
      Alert.alert('Success', 'Request Approved');
    } else {
      Alert.alert('Error', 'Failed to update status');
    }
  };

  const handleDecline = async (id) => {
    const result = await updateRequestStatus(requests, setRequests, id, 'Declined');
    if (result.success) {
      Alert.alert('Success', 'Request Declined');
    } else {
      Alert.alert('Error', 'Failed to update status');
    }
  };

  const handleImagePress = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalVisible(true);
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
        <Text style={styles.requestText}>Notes: {item.notes || 'No Notes Provided'}</Text>
        <Text style={styles.statusText}>Status: {item.status || 'Pending'}</Text>
        {item.screenshot && (
          <TouchableOpacity onPress={() => handleImagePress(item.screenshot)}>
            <Image source={{ uri: item.screenshot }} style={styles.screenshot} />
          </TouchableOpacity>
        )}
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
    <View style={styles.container}>
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={renderRequestItem}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          {selectedImage && (
            <Image source={{ uri: selectedImage }} style={styles.fullscreenImage} />
          )}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.textStyle}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  screenshot: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 5,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  fullscreenImage: {
    width: '90%',
    height: '80%',
    resizeMode: 'contain',
  },
  closeButton: {
    backgroundColor: '#6200ea',
    borderRadius: 8,
    padding: 10,
    marginTop: 15,
  },
  textStyle: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ManageRequestsScreen;
