import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { lightTheme } from './Theme';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const { login, emailVerified, resendVerificationEmail } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    const response = await login(email, password);
    setLoading(false);

    if (response.success) {
      setError(null);
      console.log('Login successful');
    } else {
      if (!emailVerified) {
        Alert.alert(
          'Email Verification Required',
          response.msg,
          [
            { text: 'Resend Verification Email', onPress: resendVerificationEmail },
            { text: 'OK' },
          ]
        );
      } else {
        setError(response.msg);
      }
    }
  };

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
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={[styles.input, { backgroundColor: lightTheme.secondary, color: lightTheme.text }]}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: lightTheme.primary }]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={[styles.buttonText, { color: lightTheme.secondary }]}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={navigateToRegister}>
        <Text style={[styles.registerText, { color: lightTheme.text }]}>Don’t have an account? Sign Up</Text>
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
    fontWeight: '600',
    color: '#fff',
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
