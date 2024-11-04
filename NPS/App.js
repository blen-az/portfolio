// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContextProvider, useAuth } from './context/AuthContext';
import AppNavigator from './navigation/AppNavigator';
import AdminNavigator from './navigation/AdminNavigator';
import AuthNavigator from './navigation/AuthNavigator';
import LoadingScreen from './screens/LoadingScreen';

const AppContent = () => {
  const { user, isAuthenticated, logout } = useAuth();

  if (isAuthenticated === undefined || (isAuthenticated && !user))  {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <AuthNavigator />;
  }

  return user.isAdmin ? (
    <AdminNavigator screenOptions={{ headerRight: () => <Button title="Logout" onPress={logout} /> }} />
  ) : (
    <AppNavigator screenOptions={{ headerRight: () => <Button title="Logout" onPress={logout} /> }} />
  );
};

const App = () => (
  <AuthContextProvider>
    <NavigationContainer>
      <AppContent />
    </NavigationContainer>
  </AuthContextProvider>
);

export default App;
