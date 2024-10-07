import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import RequestScreen from '../screens/RequestScreen';
import BookingScreen from '../screens/BookingScreen';
import ChatScreen from '../screens/ChatScreen';
import ProviderHomeScreen from '../screens/ProviderHomeScreen';
import ManageRequestsScreen from '../screens/ManageRequestsScreen';
import ManageBookingsScreen from '../screens/ManageBookingsScreen';
import PaymentHistoryScreen from '../screens/PaymentHistoryScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    
    <Stack.Navigator>
  
       <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen} 
        options={{ headerShown: false }} 
      /> 
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ headerShown: false }} 
      />
      
      <Stack.Screen 
        name="Request" 
        component={RequestScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Booking" 
        component={BookingScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Chat" 
        component={ChatScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="ProviderHome" 
        component={ProviderHomeScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="ManageRequests" 
        component={ManageRequestsScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="ManageBookings" 
        component={ManageBookingsScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="PaymentHistory" 
        component={PaymentHistoryScreen} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
