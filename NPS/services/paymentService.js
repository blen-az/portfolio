
import firebase from '../firebase';

export const fetchPaymentHistory = async (userId) => {
  const snapshot = await firebase.firestore().collection('payments').where('userId', '==', userId).get();
  const paymentHistory = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return paymentHistory;
};

