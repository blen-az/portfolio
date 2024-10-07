// services/paymentService.js
import firebase from '../firebase';

// Example function to fetch payment history
export const fetchPaymentHistory = async (userId) => {
  const snapshot = await firebase.firestore().collection('payments').where('userId', '==', userId).get();
  const paymentHistory = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return paymentHistory;
};

// Other payment-related functions can go here
