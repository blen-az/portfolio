import { View, StyleSheet, ActivityIndicator } from 'react-native';
import React from 'react';

export default function StatPage() {
    return (
        <View style={styles.container}>
           <ActivityIndicator size="large" color="gray"/>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // Added to center the ActivityIndicator horizontally
  },
});
