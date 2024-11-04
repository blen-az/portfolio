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
  const opacityAnim = new Animated.Value(0.6);

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
        source={require('../assets/BG8.jpg')}
        style={styles.backgroundImage}
      >
        <View style={[styles.header, { backgroundColor: theme.background }]}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon name="menu" size={34} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>NPS</Text>
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
                <Icon name="payment" size={48} color={theme.text} />
                <Text style={[styles.buttonText, { color: theme.text }]}>Make a Request</Text>
              </Animated.View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.button} 
              onPressIn={handlePressIn} 
              onPressOut={handlePressOut}
              onPress={() => navigation.navigate('Booking')}>
              <Animated.View style={{ transform: [{ scale: scaleAnim }], alignItems: 'center', opacity: opacityAnim }}>
                <Icon name="schedule" size={48} color={theme.text} />
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
                <Icon name="chat" size={48} color={theme.text} />
                <Text style={[styles.buttonText, { color: theme.text }]}>Chat</Text>
              </Animated.View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.button} 
              onPressIn={handlePressIn} 
              onPressOut={handlePressOut}
              onPress={() => navigation.navigate('Info')}>
              <Animated.View style={{ transform: [{ scale: scaleAnim }], alignItems: 'center', opacity: opacityAnim }}>
                <Icon name="info" size={48} color={theme.text} />
                <Text style={[styles.buttonText, { color: theme.text }]}>Information</Text>
              </Animated.View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.footer, { backgroundColor: theme.background }]}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')} style={[styles.footerItem, styles.activeFooterItem]}>
            <Icon name="home" size={45}  style={styles.activeIcon} color={theme.text}/>
            <Text style={[styles.footerText, { color: theme.text, fontWeight: 'bold' }]}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Booking')} style={styles.footerItem}>
            <Icon name="schedule" size={34} color={theme.text} />
            <Text style={[styles.footerText, { color: theme.text }]}>Booking</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Request')} style={styles.footerItem}>
            <Icon name="payment" size={34} color={theme.text} />
            <Text style={[styles.footerText, { color: theme.text }]}>Request</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Chat')} style={styles.footerItem}>
            <Icon name="chat" size={34} color={theme.text} />
            <Text style={[styles.footerText, { color: theme.text }]}>Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Info')} style={styles.footerItem}>
            <Icon name="info" size={34} color={theme.text} />
            <Text style={[styles.footerText, { color: theme.text }]}>Info</Text>
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
    marginTop: 5,
    fontWeight: '500',
    textAlign: 'center',
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
  activeFooterItem: {
    elevation: 5,
    shadowColor: '#007aff',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  activeIcon: {
    transform: [{ scale: 1.2 }],
  },
});

export default HomeScreen;
