import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { db } from '../../firebaseConfig'; // Adjust this import based on your Firebase configuration
import firebase from 'firebase/app';

const ChatRoom = ({ route }) => {
    const { user } = route.params; // Get the user object passed from the chat list
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = db.collection('chats')
            .doc(user.id) // Assuming each user has a unique ID and you store chat per user
            .collection('messages')
            .orderBy('createdAt', 'desc')
            .onSnapshot((snapshot) => {
                const fetchedMessages = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                console.log(fetchedMessages); // Log messages to check their structure
                setMessages(fetchedMessages);
                setLoading(false); // Stop loading once messages are fetched
            });

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, [user.id]);

    const handleSendMessage = () => {
        if (messageText.trim()) {
            db.collection('chats').doc(user.id).collection('messages').add({
                text: messageText,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                user: {
                    id: 'currentUserId', // Replace this with the actual current user ID
                    username: 'CurrentUser', // Replace with current user’s name
                },
            });
            setMessageText('');
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                renderItem={({ item }) => (
                    <View style={styles.messageContainer}>
                        {/* Ensure text strings are within a Text component */}
                        <Text>
                            {item?.user?.username || 'Unknown'}: {item?.text || ''}
                        </Text>
                    </View>
                )}
                keyExtractor={item => item.id}
                inverted
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={messageText}
                    onChangeText={setMessageText}
                    placeholder="Type your message..."
                />
                <Button title="Send" onPress={handleSendMessage} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    messageContainer: {
        marginVertical: 5,
        padding: 10,
        backgroundColor: '#f1f1f1',
        borderRadius: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    input: {
        flex: 1,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
    },
});

export default ChatRoom;
