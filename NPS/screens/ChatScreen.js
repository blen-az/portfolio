import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, useColorScheme, ScrollView } from 'react-native';
import { lightTheme, darkTheme } from './Theme';

const ChatScreen = ({ navigation }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;

  const sendMessage = () => {
    setMessages([...messages, message]);
    setMessage('');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView style={styles.messageContainer}>
        {messages.map((msg, index) => (
          <Text key={index} style={[styles.message, { color: theme.text }]}>{msg}</Text>
        ))}
      </ScrollView>
      <TextInput
        style={[styles.input, { backgroundColor: theme.secondary, color: theme.text }]}
        placeholder="Type a message..."
        placeholderTextColor={theme.text}
        value={message}
        onChangeText={setMessage}
      />
      <TouchableOpacity style={[styles.button, { backgroundColor: theme.primary }]} onPress={sendMessage}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  messageContainer: {
    width: '90%',
    marginBottom: 20,
  },
  message: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginVertical: 5,
  },
  input: {
    borderRadius: 15,
    padding: 15,
    width: '90%',
    marginBottom: 20,
  },
  button: {
    padding: 15,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default ChatScreen;
