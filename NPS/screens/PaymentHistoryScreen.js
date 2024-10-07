// screens/PaymentHistoryScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getPaymentHistory } from '../services/paymentService'; // Fetches payment history

const PaymentHistoryScreen = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Fetch payment history
    getPaymentHistory().then((data) => setHistory(data));
  }, []);

  const renderHistoryItem = ({ item }) => (
    <View style={styles.historyCard}>
      <Text>{item.firstName} {item.lastName} - {item.paymentType}</Text>
      <Text>Amount: {item.amount}</Text>
      <Text>Date: {item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment History</Text>
      <FlatList
        data={history}
        renderItem={renderHistoryItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  historyCard: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default PaymentHistoryScreen;
