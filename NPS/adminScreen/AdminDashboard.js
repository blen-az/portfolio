// adminScreen/AdminDashboard.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../context/AuthContext'; // Import AuthContext for logout

const AdminDashboard = ({ navigation }) => {
  const { logout } = useAuth(); // Access the logout function from AuthContext

  const handleLogout = async () => {
    await logout();
    navigation.replace('AuthNavigator'); // Navigate to login after logout
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ManageRequests')}
      >
        <Icon name="assignment" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Manage Requests</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ManageBookings')}
      >
        <Icon name="book" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Manage Bookings</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AdminChatScreen')}
      >
        <Icon name="people" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Chat</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('TransactionHistory')}
      >
        <Icon name="history" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Transaction History</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="logout" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 25,
    width: '80%',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  icon: {
    marginRight: 10,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F44336',
    padding: 15,
    borderRadius: 25,
    width: '80%',
    justifyContent: 'center',
    marginTop: 30,
  },
});

export default AdminDashboard;
