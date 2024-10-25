import React from 'react';
import { FlatList, TouchableOpacity, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements'; // Make sure this is installed

const ChatList = ({ users, onChatPress }) => {
    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => onChatPress(item)} style={styles.itemContainer}>
            <Image
                source={{ uri: item.profilePicture }} // Ensure this key exists
                style={styles.profileImage}
                PlaceholderContent={<ActivityIndicator />}
            />
            <View style={styles.textContainer}>
                <Text style={styles.userName}>{item.username || 'Unknown User'}</Text>
                <Text style={styles.userEmail}>{item.email}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={users}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
        />
    );
};

const styles = StyleSheet.create({
    listContainer: {
        padding: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        marginVertical: 5,
        borderRadius: 8,
        elevation: 2,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    userName: {
        fontWeight: 'bold',
    },
    userEmail: {
        color: '#888',
    },
});

export default ChatList;
