// ChatItem.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';

const ChatItem = ({ item, onPress }) => {
    return (
        <TouchableOpacity onPress={() => onPress(item)} style={styles.container}>
            <Image 
                source={{ uri: item.profileurl }} 
                style={styles.profilePicture} 
            />
            <View style={styles.infoContainer}>
                <Text style={styles.username}>
                    {typeof item.username === 'string' ? item.username : 'Unknown User'}
                </Text>
                <Text style={styles.lastMessage}>
                    Last message text goes here...
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: '#fff',
    },
    profilePicture: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    infoContainer: {
        flex: 1,
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    lastMessage: {
        fontSize: 14,
        color: '#888',
    },
});

export default ChatItem;
