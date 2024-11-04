// screens/AdminChatScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, KeyboardAvoidingView, TextInput, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fetchActiveUsers } from '../services/chatService'; // Ensure correct path

const AdminChatScreen = ({ navigation }) => {
  const [message, setMessage] = useState('');
  const [activeUser, setActiveUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  // Fetch users with active chats and retrieve their usernames
  useEffect(() => {
    const loadActiveUsers = async () => {
      const usersList = await fetchActiveUsers();
      setUsers(usersList);
    };

    loadActiveUsers();
  }, []);

  // Fetch messages for the selected user
  useEffect(() => {
    if (activeUser) {
      // Use your fetchMessages function here to fetch messages for the activeUser
      // Make sure it is ordered by most recent messages first
      const messagesQuery = query(
        collection(db, 'messages'),
        where('senderId', 'in', [activeUser.uid, 'admin']),
        where('recipientId', 'in', [activeUser.uid, 'admin']),
        orderBy('timestamp', 'desc') // Most recent messages first
      );

      const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
        const fetchedMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(fetchedMessages);
      });
      return unsubscribe;
    }
  }, [activeUser]);

  const sendMessage = async () => {
    if (message.trim()) {
      await addDoc(collection(db, 'messages'), {
        senderId: 'admin',
        recipientId: activeUser.uid,
        message,
        timestamp: new Date(),
      });
      setMessage('');
      Keyboard.dismiss();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => (activeUser ? setActiveUser(null) : navigation.goBack())}>
          <Icon name="arrow-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {activeUser ? `Chat with ${activeUser.username}` : 'Admin Chat'}
        </Text>
      </View>

      {!activeUser ? (
        <FlatList
          data={users}
          keyExtractor={(item) => item.uid}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.userItem} onPress={() => setActiveUser(item)}>
              <Text style={styles.userText}>{item.username}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.userList}
        />
      ) : (
        <KeyboardAvoidingView style={styles.chatContainer} behavior="padding" keyboardVerticalOffset={80}>
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.messageBubble,
                  item.senderId === 'admin' ? styles.adminBubble : styles.userBubble,
                ]}
              >
                <Text style={styles.messageText}>{item.message}</Text>
              </View>
            )}
            contentContainerStyle={styles.messageContainer}
            inverted // Inverts the list to keep the latest messages at the top
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              value={message}
              onChangeText={setMessage}
              onSubmitEditing={sendMessage}
            />
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 10 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 10 },
  userList: { padding: 10 },
  userItem: { padding: 15, backgroundColor: '#f5f5f5', marginVertical: 5, borderRadius: 8 },
  userText: { fontSize: 16, color: '#333' },
  chatContainer: { flex: 1 },
  messageContainer: { paddingHorizontal: 10, paddingVertical: 20 },
  messageBubble: { padding: 10, borderRadius: 20, marginVertical: 5, maxWidth: '80%' },
  adminBubble: { backgroundColor: '#007aff', alignSelf: 'flex-end' },
  userBubble: { backgroundColor: '#f1f1f1', alignSelf: 'flex-start' },
  messageText: { color: '#333' },
  inputContainer: { flexDirection: 'row', padding: 10, alignItems: 'center' },
  input: { flex: 1, padding: 10, borderRadius: 15, backgroundColor: '#f1f1f1' },
  sendButton: { padding: 10, backgroundColor: '#007aff', borderRadius: 20 },
  sendButtonText: { color: '#fff', fontSize: 16 },
});

export default AdminChatScreen;
