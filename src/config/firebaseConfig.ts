import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAnyo_jNqdKgQ3ogWUETIJHci_Fl2-yJYo',
  authDomain: 'queuing-system-cbbbe.firebaseapp.com',
  projectId: 'queuing-system-cbbbe',
  storageBucket: 'queuing-system-cbbbe.appspot.com',
  messagingSenderId: '19421573956',
  appId: '1:19421573956:web:2dee2e075478570f269d11',
  measurementId: 'G-VLR3JDNHD1',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const storage = firebase.storage();
