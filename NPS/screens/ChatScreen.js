import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { lightTheme } from './Theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ChatScreen = ({ navigation }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const theme = lightTheme;

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, message]);
      setMessage('');
      Keyboard.dismiss(); 
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={80} 
      >
       
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Icon name="arrow-back" size={28} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Chat</Text>
        </View>

        <ScrollView 
          contentContainerStyle={styles.messageContainer}
          keyboardShouldPersistTaps="handled"
          style={styles.scrollView}
        >
          {messages.map((msg, index) => (
            <View key={index} style={[styles.messageBubble, { backgroundColor: theme.primary }]}>
              <Text style={[styles.messageText, { color: theme.text }]}>{msg}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { backgroundColor: theme.secondary, color: theme.text }]}
            placeholder="Type a message..."
            placeholderTextColor={theme.text}
            value={message}
            onChangeText={setMessage}
            onSubmitEditing={sendMessage}
            returnKeyType="send" 
          />
          <TouchableOpacity style={[styles.button, { backgroundColor: theme.primary }]} onPress={sendMessage}>
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
    marginBottom: 10, // Ensure some margin at the bottom
  },
  messageBubble: {
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
    alignSelf: 'flex-start',
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    borderRadius: 15,
    padding: 15,
    flex: 1,
    marginRight: 10,
  },
  button: {
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default ChatScreen;
