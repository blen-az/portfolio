// services/requestService.js
import { db } from '../firebase'; // Ensure this path points to your Firebase configuration
import { collection, addDoc, getDocs, updateDoc, doc, serverTimestamp } from 'firebase/firestore';

// Function to add a new request
export const saveRequest = async (userId, requestDetails) => {
  try {
    const docRef = await addDoc(collection(db, 'requests'), {
      userId,
      ...requestDetails,
      status: 'Pending',
      timestamp: serverTimestamp(), // Use server timestamp for consistency
    });
    console.log("Document written with ID: ", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding document: ", error);
    return { success: false, msg: error.message };
  }
};

// Function to fetch all requests
export const fetchRequests = async () => {
  try {
    const requests = [];
    const querySnapshot = await getDocs(collection(db, 'requests'));
    querySnapshot.forEach((doc) => {
      requests.push({ id: doc.id, ...doc.data() });
    });
    return requests;
  } catch (error) {
    console.error("Error fetching requests:", error);
    return [];
  }
};

// Function to update a request's status
export const updateRequestStatus = async (requests, setRequests, requestId, newStatus) => {
  try {
    const requestRef = doc(db, 'requests', requestId);
    await updateDoc(requestRef, { status: newStatus });
    // Optimistically update the local state
    const updatedRequests = requests.map(req =>
      req.id === requestId ? { ...req, status: newStatus } : req
    );
    setRequests(updatedRequests);
    console.log(`Request ${requestId} status updated to ${newStatus}`);
    return { success: true };
  } catch (error) {
    console.error("Error updating request status:", error);
    return { success: false, msg: error.message };
  }
};
