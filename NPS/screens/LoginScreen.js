// NPS/screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { lightTheme } from './Theme';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  // Handles login action, simulating a successful login response and handling UI feedback
  const handleLogin = () => {
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);

    // Simulate API call for login (replace with actual authentication logic if needed)
    setTimeout(() => {
      setLoading(false);
      setError(null);  // Clear error on success
      console.log('Login successful');

      // Navigate to Home screen
      navigation.replace('Home');
    }, 1000);  // Adjust delay as needed for UI feedback
  };

  // Navigate to Register screen
  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={[styles.container, { backgroundColor: lightTheme.background }]}>
      <Text style={[styles.title, { color: lightTheme.text }]}>Login</Text>
      
      {error && <Text style={[styles.error, { color: 'red' }]}>{error}</Text>}
      
      <TextInput
        style={[styles.input, { backgroundColor: lightTheme.secondary, color: lightTheme.text }]}
        placeholder="Email"
        placeholderTextColor={lightTheme.text}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={[styles.input, { backgroundColor: lightTheme.secondary, color: lightTheme.text }]}
        placeholder="Password"
        placeholderTextColor={lightTheme.text}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: lightTheme.secondary}]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color={lightTheme.text} />
        ) : (
          <Text style={[styles.buttonText, { color: lightTheme.text }]}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={navigateToRegister}>
        <Text style={[styles.registerText, { color: lightTheme.text }]}>Don’t have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles for the LoginScreen
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
  registerText: {
    textAlign: 'center',
    marginTop: 15,
    fontSize: 16,
  },
});

export default LoginScreen;
