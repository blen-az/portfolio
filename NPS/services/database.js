
import { collection, getDocs, query, where } from 'firebase/firestore';

export const fetchRequests = async () => {
  try {
    const q = query(collection(db, 'requests'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching requests: ', error);
    return [];
  }
};

export const fetchBookings = async () => {
  try {
    const q = query(collection(db, 'bookings'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching bookings: ', error);
    return [];
  }
};
