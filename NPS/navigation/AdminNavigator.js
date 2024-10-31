import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AdminDashboard from '../adminScreen/AdminDashboard';
import ManageRequests from '../adminScreen/ManageRequests';
import ManageBookings from '../adminScreen/ManageBookings';
import UserManagement from '../adminScreen/UserManagement';
import TransactionHistory from '../adminScreen/TransactionHistory';

const AdminStack = createStackNavigator();

const AdminNavigator = () => (
  <AdminStack.Navigator initialRouteName="AdminDashboard">
    <AdminStack.Screen
      name="AdminDashboard"
      component={AdminDashboard}
      options={{ headerShown: false }}
    />
    <AdminStack.Screen name="ManageRequests" component={ManageRequests} />
    <AdminStack.Screen name="ManageBookings" component={ManageBookings} />
    <AdminStack.Screen name="UserManagement" component={UserManagement} />
    <AdminStack.Screen name="TransactionHistory" component={TransactionHistory} />
  </AdminStack.Navigator>
);

export default AdminNavigator;
