import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  ActivityIndicator,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import { fetchMessages, sendMessage } from '../services/chatService';
import { AuthContext } from '../context/AuthContext';
import { lightTheme } from '../screens/Theme';
import { CLOUDINARY_URL, CLOUDINARY_UPLOAD_PRESET } from '@env';
import Modal from 'react-native-modal';
import ImageViewer from 'react-native-image-zoom-viewer';

const ChatScreen = ({ navigation }) => {
  const [message, setMessage] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const { user } = useContext(AuthContext);
  const userId = user?.uid || 'testUser';

  const [isSending, setIsSending] = useState(false); // Prevent sending multiple times
  const [unsubscribe, setUnsubscribe] = useState(null);

  useEffect(() => {
    // Fetch messages in real-time
    const unsubscribeFunction = fetchMessages(userId, setMessages, setUnsubscribe);

    // Add a welcome message when the chat initializes
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: 'welcome',
        senderId: 'system',
        message: 'Welcome to the chat! How can we assist you today?',
      },
    ]);

    // Cleanup function to unsubscribe from Firestore updates
    return () => {
      if (unsubscribeFunction) unsubscribeFunction();
    };
  }, [userId]);

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      console.log('Image URI:', result.assets[0].uri); // Log for debugging
    }
  };

  const handleSendMessage = async () => {
    // Prevent sending the message if already sending or no content
    if (isSending || (!message.trim() && !imageUri)) return;

    setIsSending(true); // Lock sending until the image is uploaded

    let uploadedImageUrl = '';

    if (imageUri) {
      const formData = new FormData();
      formData.append('file', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'chat-image.jpg',
      });
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      try {
        setIsLoading(true); // Show the loading spinner on send
        const response = await fetch(CLOUDINARY_URL, {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        if (data.secure_url) {
          uploadedImageUrl = data.secure_url;
          console.log('Uploaded Image URL:', uploadedImageUrl);
        } else {
          console.error('Image upload failed:', data.error.message);
          setIsSending(false); // Unlock if upload fails
          setIsLoading(false);
          return;
        }
      } catch (error) {
        console.error('Image upload error:', error);
        setIsSending(false); // Unlock after error
        setIsLoading(false);
        return;
      }
    }

    // Send the message to Firestore
    const success = await sendMessage(userId, message, uploadedImageUrl);
    if (success) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Math.random().toString(),
          senderId: userId,
          message: message,
          imageUrl: uploadedImageUrl,
        },
      ]);

      // Add an autoresponse
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: Math.random().toString(),
            senderId: 'system',
            message: 'Thank you for your message! We will get back to you shortly.',
          },
        ]);
      }, 2000); // Delay autoresponse by 2 seconds

      setMessage('');
      setImageUri(null); // Clear the image after sending
    } else {
      console.error('Failed to send message');
    }

    setIsSending(false); // Unlock after sending
    setIsLoading(false);
    Keyboard.dismiss();
  };

  const handleImagePress = (imageUrl) => {
    setCurrentImage([{ url: imageUrl }]); // Set the current image for zooming
    setIsModalVisible(true); // Open the zoom modal
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={80}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={28} color={lightTheme.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Chat</Text>
        </View>

        <ScrollView contentContainerStyle={styles.messageContainer}>
          {messages.map((msg) => (
            <View
              key={msg.id}
              style={[
                styles.messageBubble,
                msg.senderId === userId
                  ? styles.userBubble
                  : msg.senderId === 'system'
                  ? styles.systemBubble
                  : styles.adminBubble,
              ]}
            >
              {msg.imageUrl && (
                <TouchableOpacity onPress={() => handleImagePress(msg.imageUrl)}>
                  <Image
                    source={{ uri: msg.imageUrl }}
                    style={styles.imageStyle} // Apply imageStyle here
                  />
                </TouchableOpacity>
              )}
              <Text style={styles.messageText}>{msg.message}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          {imageUri && (
            <Image
              source={{ uri: imageUri }}
              style={{ width: 60, height: 60, borderRadius: 10, marginRight: 10 }}
            />
          )}
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={message}
            onChangeText={setMessage}
            onFocus={() => setImageUri(null)} // Clear image when focusing on text input
            placeholderTextColor={lightTheme.text}
          />
          <TouchableOpacity onPress={handlePickImage} style={{ marginRight: 10 }}>
            <Icon name="image" size={28} color={lightTheme.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.sendButton,
              isLoading || (!message && !imageUri) ? { opacity: 0.5 } : {},
            ]}
            onPress={handleSendMessage}
            disabled={isSending || isLoading || (!message && !imageUri)} // Disable send when no message or image
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.sendButtonText}>Send</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Modal for zooming the image */}
        <Modal isVisible={isModalVisible} style={styles.modal}>
          <ImageViewer
            imageUrls={currentImage} // The image to zoom
            onCancel={() => setIsModalVisible(false)} // Close modal on cancel
            enableSwipeDown={true}
          />
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: lightTheme.secondary,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: lightTheme.text,
  },
  messageContainer: {
    flexGrow: 1,
    padding: 10,
  },
  messageBubble: {
    paddingVertical: 5, // Reduced vertical padding
    paddingHorizontal: 10, // Maintain horizontal padding for the bubble
    borderRadius: 15,
    marginVertical: 5,
    maxWidth: '80%',
    backgroundColor: 'transparent', // No background for the text bubble
  },
  adminBubble: {
    alignSelf: 'flex-start',
    backgroundColor: lightTheme.secondary,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: lightTheme.background,
  },
  messageText: {
    color: lightTheme.text,
  },

  // Image styling - no bubble, no padding, no background
  imageStyle: {
    width: 150, // Adjusted size
    height: 150, // Adjusted size
    borderRadius: 10,
    marginBottom: 5, // Optional: margin to space out image and text
    backgroundColor: 'transparent', // No background behind the image
  },
  systemBubble: {
    alignSelf: 'center',
    backgroundColor: lightTheme.secondary,
    padding: 10,
    borderRadius: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: lightTheme.secondary,
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 15,
    marginRight: 5,
    color: lightTheme.text,
  },
  sendButton: {
    padding: 10,
    borderRadius: 15,
    backgroundColor: lightTheme.primary,
  },
  sendButtonText: {
    color: '#fff',
  },
  modal: {
    margin: 0, // Full-screen modal
    justifyContent: 'center', // Center the image in the modal
  },
});

export default ChatScreen;
