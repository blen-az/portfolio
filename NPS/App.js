// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContextProvider, useAuth } from './context/AuthContext';
import AppNavigator from './navigation/AppNavigator';
import AdminNavigator from './navigation/AdminNavigator';
import AuthNavigator from './navigation/AuthNavigator';

const AppContent = () => {
  const { user, isAuthenticated } = useAuth();

  if (isAuthenticated === undefined) {
    return null; // or a loading component
  }

  // Show AuthNavigator if the user is not authenticated
  if (!isAuthenticated) {
    return <AuthNavigator />;
  }

  // Render AdminNavigator if the user is an admin, otherwise AppNavigator for regular users
  return user?.isAdmin ? <AdminNavigator /> : <AppNavigator />;
};

const App = () => (
  <AuthContextProvider>
    <NavigationContainer>
      <AppContent />
    </NavigationContainer>
  </AuthContextProvider>
);

export default App;
