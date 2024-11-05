
import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { lightTheme } from './Theme';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={lightTheme.primary} />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: lightTheme.background,
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: lightTheme.primary,
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 16,
    color: lightTheme.text,
    marginTop: 10,
  },
});

export default LoadingScreen;
