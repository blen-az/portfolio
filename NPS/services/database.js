// NPS/services/RequestService.js
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export const fetchRequests = async () => {
  try {
    const requestCollection = collection(db, 'requests');
    const querySnapshot = await getDocs(requestCollection);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching requests:', error);
    throw error; // Rethrow or handle error
  }
};
