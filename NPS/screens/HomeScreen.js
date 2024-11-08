import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, ImageBackground, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { lightTheme } from './Theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AuthContext } from '../context/AuthContext';

const HomeScreen = ({ navigation }) => {
  const theme = lightTheme;
  const { logout } = useContext(AuthContext);

  const scaleAnim = new Animated.Value(1);
  const opacityAnim = new Animated.Value(0.8);

  useEffect(() => {
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.95,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const handleLogout = async () => {
    try {
      await logout();
      Alert.alert('Logout', 'You have been logged out successfully.');
      navigation.replace('Login');
    } catch (error) {
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground 
        source={require('../assets/BG8.jpeg')}
        style={styles.backgroundImage}
      >
        <View style={[styles.header, {backgroundColor: theme.background}]}>
          <View style={{ width: 34 }} />
          <Text style={[styles.headerTitle, { color: theme.text }]}>SurePay</Text>
          <TouchableOpacity onPress={handleLogout}>
            <Icon name="logout" size={34} color={theme.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.middleSection}>
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={styles.button} 
              onPressIn={handlePressIn} 
              onPressOut={handlePressOut}
              onPress={() => navigation.navigate('Request')}>
              <Animated.View style={{ transform: [{ scale: scaleAnim }], alignItems: 'center', opacity: opacityAnim }}>
                <Icon name="payment" size={55} color={theme.text} />
                <Text style={[styles.buttonText, { color: theme.text }]}>Make a Request</Text>
              </Animated.View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.button} 
              onPressIn={handlePressIn} 
              onPressOut={handlePressOut}
              onPress={() => navigation.navigate('Booking')}>
              <Animated.View style={{ transform: [{ scale: scaleAnim }], alignItems: 'center', opacity: opacityAnim }}>
                <Icon name="schedule" size={55} color={theme.text} />
                <Text style={[styles.buttonText, { color: theme.text }]}>Schedule a Booking</Text>
              </Animated.View>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={styles.button} 
              onPressIn={handlePressIn} 
              onPressOut={handlePressOut}
              onPress={() => navigation.navigate('Chat')}>
              <Animated.View style={{ transform: [{ scale: scaleAnim }], alignItems: 'center', opacity: opacityAnim }}>
                <Icon name="chat" size={55} color={theme.text} />
                <Text style={[styles.buttonText, { color: theme.text }]}>Chat</Text>
              </Animated.View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.button} 
              onPressIn={handlePressIn} 
              onPressOut={handlePressOut}
              onPress={() => navigation.navigate('Info')}>
              <Animated.View style={{ transform: [{ scale: scaleAnim }], alignItems: 'center', opacity: opacityAnim }}>
                <Icon name="info" size={55} color={theme.text} />
                <Text style={[styles.buttonText, { color: theme.text }]}>Information</Text>
              </Animated.View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.footer, {backgroundColor: theme.background}]}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.footerItem}>
            <Icon name="home" size={45} color={theme.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Booking')} style={styles.footerItem}>
            <Icon name="schedule" size={34} color={theme.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Request')} style={styles.footerItem}>
            <Icon name="payment" size={34} color={theme.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.footerItem}>
            <Icon name="person" size={34} color={theme.text} />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
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
    marginVertical: 35,
    
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 15,
    marginTop: 5,
    fontWeight: '500',
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 15,
  },
  footerItem: {
    alignItems: 'center',
  },
});

export default HomeScreen;
