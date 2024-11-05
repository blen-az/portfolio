import { db } from '../firebase';
import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';

export const saveRequest = async (userId, requestDetails) => {
  try {
    const docRef = await addDoc(collection(db, 'requests'), {
      userId,
      ...requestDetails,
      status: 'Pending', 
      timestamp: new Date().toISOString(), 
    });
    console.log("Document written with ID: ", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding document: ", error);
    return { success: false, msg: error.message };
  }
};


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

export const updateRequestStatus = async (requestId, newStatus) => {
  try {
    const requestRef = doc(db, 'requests', requestId);
    await updateDoc(requestRef, { status: newStatus });
    console.log(`Request ${requestId} status updated to ${newStatus}`);
    return { success: true };
  } catch (error) {
    console.error("Error updating request status:", error);
    return { success: false, msg: error.message };
  }
};
