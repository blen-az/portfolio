// services/requestService.js
import firebase from '../firebase';

export const getRequests = async () => {
  const snapshot = await firebase.firestore().collection('requests').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const approveRequest = async (id) => {
  return firebase.firestore().collection('requests').doc(id).update({ status: 'approved' });
};

export const declineRequest = async (id) => {
  return firebase.firestore().collection('requests').doc(id).update({ status: 'declined' });
};
