import { db } from '../firebase'; // Make sure this path points to your Firebase configuration
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

// Function to add a new booking
export const saveBooking = async (bookingDetails) => {
  try {
    const docRef = await addDoc(collection(db, 'bookings'), bookingDetails);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error saving booking:", error);
    return { success: false, msg: error.message };
  }
};

// Function to fetch all bookings
export const fetchBookings = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'bookings'));
    const bookings = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return { success: true, bookings };
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return { success: false, msg: error.message };
  }
};

// Function to update a booking
export const updateBooking = async (bookingId, updatedDetails) => {
  try {
    const bookingRef = doc(db, 'bookings', bookingId);
    await updateDoc(bookingRef, updatedDetails);
    return { success: true };
  } catch (error) {
    console.error("Error updating booking:", error);
    return { success: false, msg: error.message };
  }
};

// Function to delete a booking
export const deleteBooking = async (bookingId) => {
  try {
    await deleteDoc(doc(db, 'bookings', bookingId));
    return { success: true };
  } catch (error) {
    console.error("Error deleting booking:", error);
    return { success: false, msg: error.message };
  }
};
