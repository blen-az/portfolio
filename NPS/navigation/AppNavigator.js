import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import RequestScreen from '../screens/RequestScreen';
import BookingScreen from '../screens/BookingScreen';
import ChatScreen from '../screens/ChatScreen';
import InfoScreen from '../screens/InfoScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import UserGuideScreen from '../screens/UserGuideScreen';
import { useAuth } from '../context/AuthContext';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator>
      {user && !user.hasSeenGuide ? (
        <Stack.Screen name="UserGuide" component={UserGuideScreen} options={{ headerShown: false }} />
      ) : (
        <>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Request" component={RequestScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Booking" component={BookingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Info" component={InfoScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;