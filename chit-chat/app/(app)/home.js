import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useAuth } from '../../context/authContext';
import { StatusBar } from 'react-native';
import ChatList from '../../components/ChatList';
import { db } from '../../firebaseConfig'; // Import Firestore instance
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore functions
import { useNavigation } from '@react-navigation/native';

export default function Home() {
    const { logout, user } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        if (user?.uid) {
            getUsers(); // Fetch users if authenticated
        }
    }, [user]);

    // Function to get users from Firestore
    const getUsers = async () => {
        try {
            const usersCollection = collection(db, 'users'); // Get the users collection reference
            const snapshot = await getDocs(usersCollection); // Fetch documents from the collection
            
            // Map snapshot docs to user data
            const usersList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            // Log fetched users for debugging
            console.log('Fetched users:', usersList);

            // Format users list, ensuring necessary fields are present
            const formattedUsersList = usersList.map(user => ({
                id: user.id,
                username: user.username || 'Unknown User', // Default username if missing
                profilePicture: user.profilePicture || user.profileurl || 'default_image_url.png', // Use profileurl if profilePicture is missing
                status: user.status || 'No status available', // Default status if missing
            }));

            setUsers(formattedUsersList); // Set the users state
        } catch (error) {
            console.error("Error fetching users: ", error);
        } finally {
            setLoading(false); // Set loading to false after fetching, even on error
        }
    };

    // Function to handle chat item press
    const handleChatPress = (item) => {
        navigation.navigate('ChatRoom', { user: item }); // Navigate to the ChatRoom screen
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" />
                </View>
            ) : users.length > 0 ? (
                <ChatList users={users} onChatPress={handleChatPress} /> // Pass the onChatPress handler
            ) : (
                <Text style={styles.noUsersText}>No users available</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noUsersText: {
        fontSize: 18,
        color: '#555',
        textAlign: 'center',
        marginTop: 20,
    },
});
