// screens/TransactionsScreen.js
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import { lightTheme } from './Theme'; 
const TransactionsScreen = () => {
  const { user } = useContext(AuthContext); 
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (user) {
      fetchTransactions();
    }
  }, [user]);

  const fetchTransactions = async () => {
    try {
      const q = query(collection(db, 'transactions'), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);

      const fetchedTransactions = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTransactions(fetchedTransactions);
    } catch (error) {
      console.error("Error fetching transactions: ", error);
    }
  };

  const renderTransaction = ({ item }) => (
    <View style={styles.transactionCard}>
      <View style={styles.iconContainer}>
        <Ionicons name="card-outline" size={24} color={lightTheme.primary} />
      </View>
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionAmount}>${item.amount}</Text>
        <Text style={styles.transactionDate}>Date: {item.date}</Text>
        <Text style={styles.transactionId}>Transaction ID: {item.id}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transactions</Text>
      {transactions.length > 0 ? (
        <FlatList
          data={transactions}
          renderItem={renderTransaction}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text style={styles.noTransactionText}>No transactions found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: lightTheme.background,
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: lightTheme.text,
    marginBottom: 20,
  },
  transactionCard: {
    flexDirection: 'row',
    backgroundColor: lightTheme.secondary,
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3, // Android shadow
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: lightTheme.primary,
    marginBottom: 5,
  },
  transactionDate: {
    fontSize: 16,
    color: lightTheme.text,
    marginBottom: 5,
  },
  transactionId: {
    fontSize: 12,
    color: '#666',
  },
  noTransactionText: {
    fontSize: 18,
    color: lightTheme.text,
    textAlign: 'center',
    marginTop: 50,
  },
  list: {
    paddingBottom: 20,
  },
});

export default TransactionsScreen;
