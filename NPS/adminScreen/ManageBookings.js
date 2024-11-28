import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, Image, Alert } from 'react-native';
import { db } from '../firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ManageBookingsScreen = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

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

    const updateStatus = async (id, newStatus, userId) => {
        try {
            const bookingRef = doc(db, 'bookings', id);
            await updateDoc(bookingRef, { status: newStatus });

            Alert.alert('Success', `Booking status updated to ${newStatus}`);
        } catch (error) {
            Alert.alert('Error', `Failed to update status: ${error.message}`);
        }
    };

    const handleImagePress = (imageUrl) => {
        setSelectedImage(imageUrl);
        setModalVisible(true);
    };

    const renderBookingItem = ({ item }) => (
        <View style={styles.bookingItem}>
            <View style={styles.textContainer}>
                <Text style={styles.bookingText}>Name: {item.firstName} {item.lastName}</Text>
                <Text style={styles.bookingText}>Booking Type: {item.paymentType}</Text>
                <Text style={styles.bookingText}>Social Media Link: {item.socialMediaLink || 'N/A'}</Text>
                <Text style={styles.bookingText}>Scheduled Date: {new Date(item.date).toLocaleString()}</Text>
                <Text style={styles.statusText}>Status: {item.status || 'Pending'}</Text>
                {item.screenshot && (
                    <TouchableOpacity onPress={() => handleImagePress(item.screenshot)}>
                        <Image source={{ uri: item.screenshot }} style={styles.screenshot} />
                    </TouchableOpacity>
                )}
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    onPress={() => updateStatus(item.id, 'approved', item.userId)} 
                    style={[styles.button, styles.approveButton]}
                >
                    <Icon name="check-circle" size={24} color="#fff" />
                    <Text style={styles.buttonText}>Approve</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => updateStatus(item.id, 'declined', item.userId)} 
                    style={[styles.button, styles.declineButton]}
                >
                    <Icon name="cancel" size={24} color="#fff" />
                    <Text style={styles.buttonText}>Decline</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#6200ea" />
                    <Text style={styles.loadingText}>Loading Bookings...</Text>
                </View>
            ) : (
                <FlatList
                    data={bookings}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContainer}
                    renderItem={renderBookingItem}
                />
            )}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <Image source={{ uri: selectedImage }} style={styles.fullscreenImage} />
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setModalVisible(!modalVisible)}
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
        padding: 10,
        backgroundColor: '#f5f5f5'
    },
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
        marginTop: 22,
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    fullscreenImage: {
        width: '90%',
        height: '80%',
        resizeMode: 'contain',
        marginBottom: 20
    },
    closeButton: {
        backgroundColor: "#2196F3",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
});

export default ManageBookingsScreen;
