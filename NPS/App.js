import React, { useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { AuthContextProvider, useAuth } from './context/AuthContext';
import AppNavigator from './navigation/AppNavigator';
import AdminNavigator from './navigation/AdminNavigator';
import AuthNavigator from './navigation/AuthNavigator';
import LoadingScreen from './screens/LoadingScreen';
import StartUploadingScreen from './screens/StartUploadingScreen';
import UserGuideScreen from './screens/UserGuideScreen';

const AppContent = () => {
  const [isUploading, setIsUploading] = useState(true); // Track initial loading state
  const { user, isAuthenticated, logout } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    // Simulate upload process or initial loading phase
    const timer = setTimeout(() => {
      setIsUploading(false); // Mark upload as complete after a delay
    }, 2000); // Set to the time needed for initial setup or upload

    return () => clearTimeout(timer); // Clear timer on unmount
  }, []);

  // Show StartUploadingScreen initially if in uploading state
  if (isUploading) {
    return <StartUploadingScreen />;
  }

  // Show LoadingScreen while determining auth state
  if (isAuthenticated === undefined || (isAuthenticated && !user)) {
    return <LoadingScreen />;
  }

  // If not authenticated, show the login flow
  if (!isAuthenticated) {
    return <AuthNavigator />;
  }

  // Navigate to UserGuideScreen if `hasSeenGuide` is false
  if (user.hasSeenGuide === false) {
    return <UserGuideScreen />;
  }

  // Return the main navigation based on user role
  return user.isAdmin ? <AdminNavigator /> : <AppNavigator />;
};

const App = () => (
  <AuthContextProvider>
    <NavigationContainer>
      <AppContent />
    </NavigationContainer>
  </AuthContextProvider>
);

export default App;
