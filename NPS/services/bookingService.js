import { db } from '../firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';

// Function to save a booking
export const saveBooking = async (bookingDetails) => {
  try {
    // Validate bookingDetails and ensure userId exists
    if (!bookingDetails || !bookingDetails.userId) {
      throw new Error('Invalid booking details: userId is missing.');
    }

    // Add createdAt timestamp and save booking to Firestore
    const docRef = await addDoc(collection(db, 'bookings'), {
      ...bookingDetails,
      createdAt: serverTimestamp(),
    });

    console.log('Booking successfully saved with ID:', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    // Log error and return failure response
    console.error('Error saving booking:', error.message);
    return { success: false, msg: error.message };
  }
};


// Function to fetch all bookings
export const fetchBookings = async () => {
  try {
    const bookingsQuery = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(bookingsQuery);

    const bookings = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log('Fetched bookings:', bookings);
    return { success: true, bookings };
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return { success: false, msg: error.message };
  }
};


// Function to update booking status
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
    await deleteDoc(doc(db, 'bookings', bookingId)); // Properly use deleteDoc
    return { success: true };
  } catch (error) {
    console.error('Error deleting booking:', error);
    return { success: false, msg: error.message };
  }
};
