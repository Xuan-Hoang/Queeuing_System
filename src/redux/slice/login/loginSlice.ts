import { createSlice } from '@reduxjs/toolkit';
import { firestore } from '../../../config/firebaseConfig';

import { AppDispatch } from '../../store';
import { Account } from '../../../types/accountType';

interface ResetPasswordInfo {
  email: string;
}
export const loginSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null as null | Account,
    resetPasswordInfo: null as null | ResetPasswordInfo,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = loginSlice.actions;

export const loginWithEmailAndPassword = (username: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    const usersRef = firestore.collection('Account');
    const querySnapshot = await usersRef.where('username', '==', username).where('password', '==', password).get();

    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      dispatch(setUser(userData));
      const username = userData.username;
      localStorage.setItem('username', username);
      return username || '';
    } else {
      return '';
    }
  } catch (error) {
    console.error('Error logging in:', error);
    return '';
  }
};

export const fetchUserDataByUser = (username: string) => async (dispatch: AppDispatch) => {
  try {
    const usersRef = firestore.collection('Account');
    const querySnapshot = await usersRef.where('username', '==', username).get();

    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      dispatch(setUser(userData));
    } else {
      console.log('User not found');
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

export const checkEmail = (email: string) => async (dispatch: AppDispatch) => {
  try {
    const usersRef = firestore.collection('Account');
    const querySnapshot = await usersRef.where('email', '==', email).where('email', '==', email).get();

    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      dispatch(setUser(userData));
      const email = userData.email;
      localStorage.setItem('email', email);
      return email || '';
    } else {
      return '';
    }
  } catch (error) {
    console.error('Error logging in:', error);
    return '';
  }
};
export const updatePasswordByEmail = (newPassword: string) => async (dispatch: AppDispatch) => {
  try {
    const storedEmail = localStorage.getItem('email');

    if (storedEmail) {
      const usersRef = firestore.collection('Account');
      const querySnapshot = await usersRef.where('email', '==', storedEmail).get();
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        await userDoc.ref.update({ password: newPassword });
        const updatedQuerySnapshot = await usersRef.doc(userDoc.id).get();
        const updatedUserData = updatedQuerySnapshot.data();
        dispatch(setUser(updatedUserData));
      } else {
        console.log('User with stored email not found');
      }
    } else {
      console.log('No stored email in localStorage');
    }
  } catch (error) {
    console.error('Error updating password:', error);
  }
};

export default loginSlice.reducer;
