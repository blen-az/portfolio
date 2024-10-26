import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; 
import { lightTheme, darkTheme } from './Theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AuthContext } from '../context/AuthContext'; 

const HomeScreen = ({ navigation }) => {
  const scheme = useColorScheme();
  const theme = lightTheme;
  const { logout } = useContext(AuthContext); 

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground 
        source={require('../assets/Background1.jpeg')} 
        style={styles.backgroundImage}
        imageStyle={{ opacity: 0.5 }} 
      >
        {/* Header */}
        <View style={[styles.header, { backgroundColor: theme.background }]}>
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
          <View style={styles.buttonRow}>
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
          </View>

          <View style={styles.buttonRow}>
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
        </View>

        {/* Footer */}
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
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
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
    paddingHorizontal: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 22,
    borderRadius: 10,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
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
