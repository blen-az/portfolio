import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContextProvider } from './context/AuthContext'; 
import AppNavigator from './navigation/AppNavigator';
import AdminNavigator from './navigation/AdminNavigator';

const App = () => {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <AdminNavigator />
      </NavigationContainer>
    </AuthContextProvider>
  );
};

export default App;
