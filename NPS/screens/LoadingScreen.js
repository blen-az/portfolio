// NPS/screens/LoadingScreen.js
import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

const LoadingScreen = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#6200ea" />
    <Text style={styles.loadingText}>Loading...</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#6200ea',
  },
});

export default LoadingScreen;
