// RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { lightTheme } from './Theme'; // Import your light theme

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const { register } = useAuth();
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    const response = await register(email, password, username);
    if (!response.success) {
      setError(response.msg);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: lightTheme.background }]}>
      <Text style={[styles.title, { color: lightTheme.text }]}>Register</Text>
      {error && <Text style={[styles.error, { color: 'red' }]}>{error}</Text>}
      
      <TextInput
        style={[styles.input, { backgroundColor: lightTheme.secondary, color: lightTheme.text }]}
        placeholder="Username"
        placeholderTextColor={lightTheme.text}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={[styles.input, { backgroundColor: lightTheme.secondary, color: lightTheme.text }]}
        placeholder="Email"
        placeholderTextColor={lightTheme.text}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={[styles.input, { backgroundColor: lightTheme.secondary, color: lightTheme.text }]}
        placeholder="Password"
        placeholderTextColor={lightTheme.text}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={[styles.button, { backgroundColor: lightTheme.primary }]} onPress={handleRegister}>
        <Text style={[styles.buttonText, { color: lightTheme.text }]}>Register</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={{ color: lightTheme.text }}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
  },
  error: {
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default RegisterScreen;
