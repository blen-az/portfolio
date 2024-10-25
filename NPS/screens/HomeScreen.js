import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; 
import { lightTheme, darkTheme } from './Theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

const HomeScreen = ({ navigation }) => {
  const scheme = useColorScheme();
  const theme = lightTheme;
  const { logout } = useContext(AuthContext); // Use AuthContext to access logout

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header]}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon name="menu" size={28} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>NPS</Text>
        <TouchableOpacity onPress={async () => await logout()}>
          <Icon name="logout" size={28} color={theme.text} />
        </TouchableOpacity>
      </View>

      {/* Middle section */}
      <View style={styles.middleSection}>
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: theme.primary }]} 
          onPress={() => navigation.navigate('Request')}>
          <Icon name="payment" size={24} color={theme.text} />
          <Text style={[styles.buttonText, { color: theme.text }]}>Make a Request</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, { backgroundColor: theme.primary }]} 
          onPress={() => navigation.navigate('Booking')}>
          <Icon name="schedule" size={24} color={theme.text} />
          <Text style={[styles.buttonText, { color: theme.text }]}>Schedule a Booking</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, { backgroundColor: theme.primary }]} 
          onPress={() => navigation.navigate('Chat')}>
          <Icon name="chat" size={24} color={theme.text} />
          <Text style={[styles.buttonText, { color: theme.text }]}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, { backgroundColor: theme.primary }]} 
          onPress={() => navigation.navigate('Info')}>
          <Icon name="info" size={24} color={theme.text} />
          <Text style={[styles.buttonText, { color: theme.text }]}>Information</Text>
        </TouchableOpacity>
      </View>

      {/* Footer  */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.footerItem}>
          <Icon name="home" size={28} color={theme.text} />
          <Text style={[styles.footerText, { color: theme.text }]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Transactions')} style={styles.footerItem}>
          <Icon name="receipt" size={28} color={theme.text} />
          <Text style={[styles.footerText, { color: theme.text }]}>Transactions</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.footerItem}>
          <Icon name="person" size={28} color={theme.text} />
          <Text style={[styles.footerText, { color: theme.text }]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  middleSection: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 15,
    borderRadius: 12,
    marginVertical: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    marginLeft: 15,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  footerItem: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    marginTop: 5,
  },
});

export default HomeScreen;
