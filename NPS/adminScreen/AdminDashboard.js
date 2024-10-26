// NPS/screens/AdminDashboard.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const AdminDashboard = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      {/* Navigation to Admin Screens */}
      <Button title="Manage Requests" onPress={() => navigation.navigate('ManageRequests')} />
      <Button title="Manage Bookings" onPress={() => navigation.navigate('ManageBookings')} />
      <Button title="User Management" onPress={() => navigation.navigate('UserManagement')} />
      <Button title="View Transactions" onPress={() => navigation.navigate('TransactionHistory')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default AdminDashboard;
