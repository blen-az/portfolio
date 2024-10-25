import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContextProvider } from './context/AuthContext'; // Ensure it's named correctly
import AppNavigator from './navigation/AppNavigator'; // Ensure this file exports AppNavigator

const App = () => {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthContextProvider>
  );
};

export default App;
