import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Keyboard, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fetchMessages, sendMessage } from '../services/chatService';
import { AuthContext } from '../context/AuthContext';
import { lightTheme } from '../screens/Theme';

const ChatScreen = ({ navigation }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const userId = user?.uid || 'testUser';

  const autoResponses = [
    "Thank you for your message! Our team will get back to you shortly.",
    "Can you provide more details about your query?",
    "We appreciate your patience. Let us know how else we can help.",
    "If you're looking for payment guidance, feel free to ask.",
    "We're here to assist you with any concerns or inquiries you have."
  ];

  useEffect(() => {
    const unsubscribe = fetchMessages(userId, (fetchedMessages) => {
      setMessages(fetchedMessages);

      // Check if this is the first time the user is opening the chat
      if (fetchedMessages.length === 0) {
        sendWelcomeMessages();
      }
    });

    return () => unsubscribe();
  }, [userId]);

  const sendWelcomeMessages = async () => {
    // Array of predefined welcome messages
    const welcomeMessages = [
      "Welcome to SurePay Support! How can we assist you today?",
      "You can ask about payment processes, schedules, or any other queries.",
      "Our team is here to help. Feel free to type your question below."
    ];

    // Send messages one by one with a short delay for a more natural flow
    for (const message of welcomeMessages) {
      await sendMessage('admin', message);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1-second delay
    }
  };

  const handleSendMessage = async () => {
    if (message.trim()) {
      setIsLoading(true);

      // Send user message
      const success = await sendMessage(userId, message);
      setIsLoading(false);

      if (success) {
        setMessage('');
        Keyboard.dismiss();

        // Simulate an auto-reply from the admin
        setTimeout(async () => {
          const randomResponse = autoResponses[Math.floor(Math.random() * autoResponses.length)];
          await sendMessage('admin', randomResponse);
        }, 2000); // 2-second delay for realism
      } else {
        Alert.alert('Error', 'Failed to send message.');
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
          <TouchableOpacity
            style={[styles.sendButton, { backgroundColor: lightTheme.primary }]}
            onPress={handleSendMessage}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.sendButtonText}>Send</Text>
            )}
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
