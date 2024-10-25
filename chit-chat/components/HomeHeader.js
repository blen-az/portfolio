import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Menu, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import CustomMenuItem from './CustomMenuItem';  // Ensure correct import
import { useAuth } from '../context/authContext';
export default function HomeHeader() {
    const {user, logout} = useAuth();
    const handleLogout = async () =>{
        await logout();
    }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Chats</Text>
        <Menu>
          <MenuTrigger>
            <Image 
              style={styles.image}
              source={{ uri: 'https://picsum.photos/seed/696/3000/2000' }} 
              resizeMode="cover" 
            />
          </MenuTrigger>
          <MenuOptions>
            <CustomMenuItem text="Sign out" value="settings" action={handleLogout} />
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    height: 120,
    backgroundColor: '#967BB6',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    position: 'relative',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
