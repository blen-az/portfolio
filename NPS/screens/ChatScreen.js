import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fetchMessages, sendMessage } from '../services/chatService';
import { AuthContext } from '../context/AuthContext';
import { lightTheme } from '../screens/Theme'; // Import the theme

const ChatScreen = ({ navigation }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const { user } = useContext(AuthContext);
  const userId = user?.uid || 'testUser'; // Replace 'testUser' with actual user ID if testing

  useEffect(() => {
    const unsubscribe = fetchMessages(userId, setMessages);
    return () => unsubscribe();
  }, [userId]);

  const handleSendMessage = async () => {
    if (message.trim()) {
      const success = await sendMessage(userId, message);
      if (success) {
        setMessage('');
        Keyboard.dismiss();
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={80}>
        
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Icon name="arrow-back" size={28} color={lightTheme.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: lightTheme.text }]}>Chat</Text>
        </View>

        <ScrollView 
          contentContainerStyle={styles.messageContainer}
          keyboardShouldPersistTaps="handled"
          style={styles.scrollView}
        >
          {messages.map((msg) => (
            <View
              key={msg.id}
              style={[
                styles.messageBubble,
                msg.senderId === userId ? styles.userBubble : styles.adminBubble,
                { backgroundColor: msg.senderId === userId ? lightTheme.background : lightTheme.secondary },
              ]}
            >
            <Text style={[styles.messageText, { color: lightTheme.text }]}>{msg.message}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { backgroundColor: lightTheme.secondary, color: lightTheme.text }]}
            placeholder="Type a message..."
            placeholderTextColor={lightTheme.placeholder}
            value={message}
            onChangeText={setMessage}
            onSubmitEditing={handleSendMessage}
            returnKeyType="send"
          />
          <TouchableOpacity style={[styles.sendButton, { backgroundColor: lightTheme.primary }]} onPress={handleSendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  messageContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  scrollView: {
    flexGrow: 1,
    marginBottom: 10,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
    maxWidth: '80%',
  },
  adminBubble: {
    alignSelf: 'flex-start',
  },
  userBubble: {
    alignSelf: 'flex-end',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 15,
    marginRight: 10,
  },
  sendButton: {
    padding: 10,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ChatScreen;
