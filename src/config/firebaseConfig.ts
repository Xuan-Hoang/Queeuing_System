import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBUG8F-6AHy_hZBnXSU5jl2F8qmJZ8J1C8',
  authDomain: 'queuing-system-6504c.firebaseapp.com',
  projectId: 'queuing-system-6504c',
  storageBucket: 'queuing-system-6504c.appspot.com',
  messagingSenderId: '1032393352508',
  appId: '1:1032393352508:web:5a78b5997d651b45182a39',
  measurementId: 'G-GJPBBX3DHP',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const storage = firebase.storage();
