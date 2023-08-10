import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../store';
import { firestore } from '../../../config/firebaseConfig';
import { Logo } from '../../../types/logoType';

interface LogoState {
  logos: Logo[];
  loading: boolean;
  error: string | null;
}

const initialState: LogoState = {
  logos: [],
  loading: false,
  error: null,
};

const logoSlice = createSlice({
  name: 'logo',
  initialState,
  reducers: {
    fetchLogosStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchLogosSuccess(state, action: PayloadAction<Logo[]>) {
      state.logos = action.payload;
      state.loading = false;
    },

    fetchLogosFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchLogosStart, fetchLogosSuccess, fetchLogosFailure } = logoSlice.actions;

export default logoSlice.reducer;

export const fetchLogos = (): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchLogosStart());
    const logoRef = firestore.collection('logo');
    const snapshot = await logoRef.get();
    const logos: Logo[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      logo: doc.data().logo,
      coverPhoto: doc.data().coverPhoto,
      coverPhoto2: doc.data().coverPhoto2,
    }));
    dispatch(fetchLogosSuccess(logos));
  } catch (error) {
    dispatch(fetchLogosFailure('Failed to fetch Logo.'));
  }
};

export const selectLogos = (state: RootState) => state.logo.logos;

export const selectLoading = (state: RootState) => state.logo.loading;
