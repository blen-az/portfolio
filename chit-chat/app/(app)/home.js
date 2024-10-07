import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useAuth } from '../../context/authContext';

export default function Home() {
    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home</Text>
            
            {/* Logout Button */}
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Log Out</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#ff6347', // Tomato red color
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
