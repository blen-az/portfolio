import { View, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { MenuProvider } from 'react-native-popup-menu';
import { Slot, useRouter, useSegments } from 'expo-router';
import { AuthContextProvider, useAuth } from '../context/authContext';

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (typeof isAuthenticated === 'undefined') return;

    const inApp = segments[0] === '(app)';

    if (isAuthenticated && !inApp) {
      router.replace('home');
    } else if (isAuthenticated === false) {
      router.replace('signIn');
    }
  }, [isAuthenticated]);

  return (
    <View style={styles.container}>
      <Slot />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function RootLayout() {
  return (
    <MenuProvider>
      <AuthContextProvider>
      <MainLayout />
     </AuthContextProvider>
    </MenuProvider>

    
  );
}
