import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContextProvider, useAuth } from './context/AuthContext';
import AppNavigator from './navigation/AppNavigator';
import AdminNavigator from './navigation/AdminNavigator';
import AuthNavigator from './navigation/AuthNavigator';
import LoadingScreen from './screens/LoadingScreen';
import StartUploadingScreen from './screens/StartUploadingScreen';

const AppContent = () => {
  const [isUploading, setIsUploading] = useState(true); // Track initial loading state
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    // Simulate upload process or initial loading phase
    const timer = setTimeout(() => {
      setIsUploading(false); // Mark upload as complete after a delay
    }, 2000); // Set to the time needed for initial setup or upload

    return () => clearTimeout(timer); // Clear timer on unmount
  }, []);

  if (isUploading) {
    return <StartUploadingScreen />; // Show StartUploadingScreen initially
  }

  if (isAuthenticated === undefined || (isAuthenticated && !user)) {
    return <LoadingScreen />; // Show LoadingScreen while determining auth state
  }

  if (!isAuthenticated) {
    return <AuthNavigator />; // If not authenticated, show the login flow
  }

  // Return the main navigation based on user role
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
