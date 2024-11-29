import { db } from '../firebase'; // Ensure this path points to your Firebase configuration
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore';

// Function to add a new request
export const saveRequest = async (userId, requestDetails) => {
  try {
    if (!userId || !requestDetails) {
      throw new Error('Invalid input: userId or requestDetails missing.');
    }

    const docRef = await addDoc(collection(db, 'requests'), {
      ...requestDetails,
      userId,
      createdAt: serverTimestamp(),
    });
    console.log('Request saved with ID:', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving request:', error);
    return { success: false, msg: error.message };
  }
};
// Function to fetch all requests
export const fetchRequests = async () => {
  try {
    console.log('Fetching requests...');
    const q = query(collection(db, 'requests'), orderBy('createdAt', 'desc')); // Order by createdAt
    const querySnapshot = await getDocs(q);

    const requests = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log('Fetched requests:', requests);
    return { success: true, requests };
  } catch (error) {
    console.error('Error fetching requests:', error);
    return { success: false, msg: error.message, requests: [] };
  }
};

// Function to update a request's status
export const updateRequestStatus = async (requestId, updatedDetails) => {
  try {
    const requestRef = doc(db, 'requests', requestId);
    await updateDoc(requestRef, updatedDetails);
    console.log(`Request ${requestId} status updated to ${updatedDetails.status}`);
    return { success: true };
  } catch (error) {
    console.error('Error updating request status:', error);
    return { success: false, msg: error.message };
  }
};

// Function to delete a request
export const deleteRequest = async (requestId) => {
  try {
    const requestRef = doc(db, 'requests', requestId);
    await deleteDoc(requestRef);
    console.log(`Request ${requestId} deleted successfully.`);
    return { success: true };
  } catch (error) {
    console.error('Error deleting request:', error);
    return { success: false, msg: error.message };
  }
};
