import { db } from '../firebase';
import { collection, query, where, orderBy, onSnapshot, addDoc, Timestamp } from 'firebase/firestore';

/**
 * Fetch messages between the user and admin in real-time.
 * @param {string} userId - ID of the user.
 * @param {function} setMessages - State setter for messages.
 * @returns {function} Unsubscribe function for real-time updates.
 */
export const fetchMessages = (userId, setMessages) => {
  const messagesQuery = query(
    collection(db, 'messages'),
    where('senderId', 'in', [userId, 'admin']),
    where('recipientId', 'in', [userId, 'admin']),
    orderBy('timestamp', 'asc')
  );

  const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
    const fetchedMessages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setMessages(fetchedMessages);
  });

  return unsubscribe;
};

/**
 * Sends a message from the user to the admin.
 * @param {string} userId - ID of the user.
 * @param {string} message - The message text.
 * @returns {Promise<boolean>} True if successful, false if an error occurred.
 */
export const sendMessage = async (userId, message) => {
  try {
    await addDoc(collection(db, 'messages'), {
      senderId: userId,
      recipientId: 'admin',
      message,
      timestamp: Timestamp.now(),
    });
    return true;
  } catch (error) {
    console.error("Error sending message:", error);
    return false;
  }
};
