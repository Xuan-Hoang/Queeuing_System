// src/features/logoSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../store';
import { firestore } from '../../../config/firebaseConfig';
import { Logo } from '../../../types/logoType';

const initialState: Logo = {
  logo: '',
  coverPhoto: '',
  coverPhoto2: '',
  id: '',
};

const logoSlice = createSlice({
  name: 'logo',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<Logo>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setData } = logoSlice.actions;

export default logoSlice.reducer;

// Selector để lấy dữ liệu logo từ Redux Store
export const selectLogo = (state: RootState) => state.logo;
export const fetchLogoData = (): AppThunk => async (dispatch) => {
  try {
    const docRef = firestore.collection('logo').doc('urqD3DjswAVRthjcII1h');
    const doc = await docRef.get();

    if (doc.exists) {
      const logoData = doc.data() as Logo;
      dispatch(setData(logoData));
    } else {
      console.log('No such document!');
    }
  } catch (error) {
    console.error('Error fetching logo data:', error);
  }
};
