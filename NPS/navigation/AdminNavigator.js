import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AdminDashboard from '../adminScreen/AdminDashboard';
import ManageBookings from '../adminScreen/ManageBookings';
import UserManagement from '../adminScreen/UserManagement';
import ManageRequests from '../adminScreen/ManageRequests';

const AdminStack = createStackNavigator();

const AdminNavigator = () => {
  return (
    <AdminStack.Navigator>
      <AdminStack.Screen
        name="AdminDashboard"
        component={AdminDashboard}
        options={{ headerShown: false }}
      />
      <AdminStack.Screen
        name="ManageRequests"
        component={ManageRequests}
        options={{ headerShown: false }}
      />
      <AdminStack.Screen
        name="ManageBookings"
        component={ManageBookings}
        options={{ headerShown: false }}
      />
      <AdminStack.Screen
        name="UserManagement"
        component={UserManagement}
        options={{ headerShown: false }}
      />
    </AdminStack.Navigator>
  );
};

export default AdminNavigator;
