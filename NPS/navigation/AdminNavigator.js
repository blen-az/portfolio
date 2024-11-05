import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AdminDashboard from '../adminScreen/AdminDashboard';
import ManageRequests from '../adminScreen/ManageRequests';
import ManageBookings from '../adminScreen/ManageBookings';
import AdminChatScreen from '../adminScreen/AdminChatScreen';

const AdminStack = createStackNavigator();

const AdminNavigator = () => (
  <AdminStack.Navigator initialRouteName="AdminDashboard">
    <AdminStack.Screen
      name="AdminDashboard"
      component={AdminDashboard}
      options={{ headerShown: false }}
    />
    <AdminStack.Screen name="ManageRequests" component={ManageRequests} options={{ headerShown: false }} />
    <AdminStack.Screen name="ManageBookings" component={ManageBookings} options={{ headerShown: false }} />
    <AdminStack.Screen name="AdminChatScreen" component={AdminChatScreen} options={{ headerShown: false }} />
  </AdminStack.Navigator>
);

export default AdminNavigator;
