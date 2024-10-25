// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { lightTheme } from './Theme'; // Import your light theme

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true); // Start loading
    const response = await login(email, password);
    setLoading(false); // Stop loading

    if (response.success) {
      setError(null); // Clear any previous error
      navigation.navigate('Home'); // Navigate to HomeScreen on successful login
    } else {
      setError(response.msg); // Display error message
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: lightTheme.background }]}>
      <Text style={[styles.title, { color: lightTheme.text }]}>Login</Text>
      
      {/* Display error message */}
      {error && <Text style={[styles.error, { color: 'red', fontWeight: 'bold' }]}>{error}</Text>}
      
      <TextInput
        style={[styles.input, { backgroundColor: lightTheme.secondary, color: lightTheme.text }]}
        placeholder="Email"
        placeholderTextColor={lightTheme.text}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none" // Ensure email is not auto-capitalized
      />
      <TextInput
        style={[styles.input, { backgroundColor: lightTheme.secondary, color: lightTheme.text }]}
        placeholder="Password"
        placeholderTextColor={lightTheme.text}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Button or Loading Indicator */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: lightTheme.primary }]}
        onPress={handleLogin}
        disabled={loading} // Disable button while loading
      >
        {loading ? (
          <ActivityIndicator size="small" color={lightTheme.text} />
        ) : (
          <Text style={[styles.buttonText, { color: lightTheme.text }]}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={{ color: lightTheme.text }}>Don't have an account? Register</Text>
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

export default LoginScreen;
