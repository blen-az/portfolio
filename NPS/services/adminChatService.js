import { db } from '../firebase';
import { collection, query, where, orderBy, onSnapshot, addDoc, getDoc, getDocs, doc } from 'firebase/firestore';

// Fetches a list of active users with unique usernames, sorted by the latest message timestamp
export const fetchActiveUsers = async () => {
  const userMap = new Map();

  try {
    // Query messages to get sender IDs where recipient is admin, ordered by timestamp
    const messagesQuery = query(
      collection(db, 'messages'),
      where('recipientId', '==', 'admin'),
      orderBy('timestamp', 'desc')
    );
    const messageSnapshot = await getDocs(messagesQuery);

    // Store only the latest message timestamp for each unique user
    messageSnapshot.forEach((doc) => {
      const data = doc.data();
      if (!userMap.has(data.senderId)) {
        userMap.set(data.senderId, data.timestamp);
      }
    });

    // Fetch usernames based on user IDs and include the latest timestamp
    const userPromises = Array.from(userMap.keys()).map(async (userId) => {
      const userDoc = await getDoc(doc(db, 'users', userId));
      return userDoc.exists()
        ? { uid: userId, username: userDoc.data().username || 'Unknown', timestamp: userMap.get(userId) }
        : { uid: userId, username: 'Unknown', timestamp: userMap.get(userId) };
    });

    const usersWithUsernames = await Promise.all(userPromises);

    // Sort users by timestamp (most recent first)
    return usersWithUsernames.sort((a, b) => b.timestamp - a.timestamp);
  } catch (error) {
    console.error("Error fetching active users:", error);
    return [];
  }
};

// Fetches messages between the admin and a specific user
export const fetchMessages = (userId, setMessages) => {
  const messagesQuery = query(
    collection(db, 'messages'),
    where('senderId', 'in', [userId, 'admin']),
    where('recipientId', 'in', [userId, 'admin']),
    orderBy('timestamp', 'desc')
  );

  return onSnapshot(messagesQuery, (snapshot) => {
    const fetchedMessages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setMessages(fetchedMessages);
  });
};

// Sends a message from admin to a specific user
export const sendMessage = async (recipientId, message) => {
  try {
    await addDoc(collection(db, 'messages'), {
      senderId: 'admin',
      recipientId,
      message,
      timestamp: new Date(),
    });
    return true;
  } catch (error) {
    console.error("Error sending message:", error);
    return false;
  }
};
