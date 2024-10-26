import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme, Animated, ImageBackground,Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; 
import { lightTheme } from './Theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AuthContext } from '../context/AuthContext';

const HomeScreen = ({ navigation }) => {
  const scheme = useColorScheme();
  const theme = lightTheme;
  const { logout } = useContext(AuthContext);
  
  // Animation for button press and login effect
  const scaleAnim = new Animated.Value(1);
  const opacityAnim = new Animated.Value(0);

  // Handle logout function
  const handleLogout = async () => {
    const response = await logout();
    if (response.success) {
      // Animate on successful logout
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.5, // Scale up
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        navigation.navigate('Login'); // Change 'Login' to your actual login screen name
      });
    } else {
      // Handle error case, e.g., show a message
      alert(response.msg || "Logout failed");
    }
  };

  // Trigger animation on component mount
  useEffect(() => {
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  // Function to handle button press animation
  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.95, // Scale down to create dip effect
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1, // Scale back to original size
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground 
        source={require('../assets/BG3.jpeg')} // Ensure this path is correct
        style={styles.backgroundImage}
      >
        {/* Header */}
        <View style={[styles.header, { backgroundColor: theme.background }]}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon name="menu" size={28} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>NPS</Text>
          <TouchableOpacity onPress={handleLogout}>
            <Icon name="logout" size={28} color={theme.text} />
          </TouchableOpacity>
        </View>

        {/* Middle section */}
        <View style={styles.middleSection}>
        
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={[styles.button, { backgroundColor: theme.primary }]} 
              onPressIn={handlePressIn} 
              onPressOut={handlePressOut}
              onPress={() => navigation.navigate('Request')}>
              <Animated.View style={{ transform: [{ scale: scaleAnim }], alignItems: 'center', opacity: opacityAnim }}>
                <Icon name="payment" size={24} color={theme.text} />
                <Text style={[styles.buttonText, { color: theme.text }]}>Make a Request</Text>
              </Animated.View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, { backgroundColor: theme.primary }]} 
              onPressIn={handlePressIn} 
              onPressOut={handlePressOut}
              onPress={() => navigation.navigate('Booking')}>
              <Animated.View style={{ transform: [{ scale: scaleAnim }], alignItems: 'center', opacity: opacityAnim }}>
                <Icon name="schedule" size={24} color={theme.text} />
                <Text style={[styles.buttonText, { color: theme.text }]}>Schedule a Booking</Text>
              </Animated.View>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={[styles.button, { backgroundColor: theme.primary }]} 
              onPressIn={handlePressIn} 
              onPressOut={handlePressOut}
              onPress={() => navigation.navigate('Chat')}>
              <Animated.View style={{ transform: [{ scale: scaleAnim }], alignItems: 'center', opacity: opacityAnim }}>
                <Icon name="chat" size={24} color={theme.text} />
                <Text style={[styles.buttonText, { color: theme.text }]}>Chat</Text>
              </Animated.View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, { backgroundColor: theme.primary }]} 
              onPressIn={handlePressIn} 
              onPressOut={handlePressOut}
              onPress={() => navigation.navigate('Info')}>
              <Animated.View style={{ transform: [{ scale: scaleAnim }], alignItems: 'center', opacity: opacityAnim }}>
                <Icon name="info" size={24} color={theme.text} />
                <Text style={[styles.buttonText, { color: theme.text }]}>Information</Text>
              </Animated.View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={[styles.footer, { backgroundColor: theme.background }]}>
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
    marginTop: 5, // Adjust margin to create space above the text
    fontWeight: '500',
    textAlign: 'center', // Center the text
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
