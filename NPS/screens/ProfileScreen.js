import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { lightTheme } from './Theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db } from '../firebase';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';

const ProfileScreen = () => {
  const theme = lightTheme;
  const { user, logout } = useContext(AuthContext);
  const navigation = useNavigation();
  const [lastBookingStatus, setLastBookingStatus] = useState(null);
  const [lastRequestStatus, setLastRequestStatus] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(true);

  // Fetch the last inquiry statuses
  useEffect(() => {
    const fetchLastInquiries = async () => {
      if (!user) return;

      try {
        // Fetch last booking status
        const bookingQuery = query(
          collection(db, 'bookings'),
          where('userId', '==', user.uid),
          orderBy('timestamp', 'desc'),
          limit(1)
        );
        const bookingSnapshot = await getDocs(bookingQuery);
        if (!bookingSnapshot.empty) {
          const lastBooking = bookingSnapshot.docs[0].data();
          setLastBookingStatus(lastBooking.status || 'Pending');
        } else {
          setLastBookingStatus('No bookings found');
        }

        // Fetch last request status
        const requestQuery = query(
          collection(db, 'requests'),
          where('userId', '==', user.uid),
          orderBy('timestamp', 'desc'),
          limit(1)
        );
        const requestSnapshot = await getDocs(requestQuery);
        if (!requestSnapshot.empty) {
          const lastRequest = requestSnapshot.docs[0].data();
          setLastRequestStatus(lastRequest.status || 'Pending');
        } else {
          setLastRequestStatus('No requests found');
        }
      } catch (error) {
        console.error('Error fetching inquiries:', error);
        setLastBookingStatus('Error fetching status');
        setLastRequestStatus('Error fetching status');
      } finally {
        setLoadingStatus(false);
      }
    };

    fetchLastInquiries();
  }, [user]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Profile</Text>
      </View>

      {user ? (
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Icon name="person" size={28} color={theme.primary} />
            <Text style={styles.info}>{user.username}</Text>
          </View>

          <View style={styles.card}>
            <Icon name="email" size={28} color={theme.primary} />
            <Text style={styles.info}>{user.email}</Text>
          </View>

          {/* Last Booking Status */}
          <View style={styles.card}>
            <Icon name="event" size={28} color={theme.primary} />
            <Text style={styles.info}>
              Last Booking Status: {loadingStatus ? 'Loading...' : lastBookingStatus}
            </Text>
          </View>

          {/* Last Request Status */}
          <View style={styles.card}>
            <Icon name="request-quote" size={28} color={theme.primary} />
            <Text style={styles.info}>
              Last Request Status: {loadingStatus ? 'Loading...' : lastRequestStatus}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => {
              Alert.alert(
                'Confirm Logout',
                'Are you sure you want to log out?',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Logout cancelled'),
                    style: 'cancel',
                  },
                  {
                    text: 'Yes',
                    onPress: async () => {
                      try {
                        await logout();
                        navigation.replace('Login');
                      } catch (error) {
                        Alert.alert('Error', 'Failed to log out. Please try again.');
                      }
                    },
                  },
                ],
                { cancelable: false }
              );
            }}
          >
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.loadingText}>Loading user data...</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardContainer: {
    flexGrow: 1,
    width: '100%',
    paddingHorizontal: 15,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: lightTheme.secondary,
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  info: {
    fontSize: 18,
    color: lightTheme.text,
    fontWeight: '500',
    marginLeft: 10,
  },
  logoutButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: lightTheme.primary,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  loadingText: {
    fontSize: 16,
    color: lightTheme.text,
  },
});

export default ProfileScreen;
