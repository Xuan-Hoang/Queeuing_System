import { createSlice } from '@reduxjs/toolkit';
import { firestore } from '../../../config/firebaseConfig';

import { AppDispatch } from '../../store';
import { Account } from '../../../types/accountType';

export const loginSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null as null | Account,
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
export default loginSlice.reducer;
export const loginWithEmailAndPassword = (username: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    const usersRef = firestore.collection('Account');
    const querySnapshot = await usersRef.where('username', '==', username).where('password', '==', password).get();

    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      dispatch(setUser(userData));
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error logging in:', error);
    return false;
  }
};
