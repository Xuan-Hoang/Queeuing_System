import { firestore } from './../../../config/firebaseConfig';
import { createSlice } from '@reduxjs/toolkit';

import { AppDispatch, RootState } from '../../store';

import { NumberLevel } from '../../../types/NumberLevel';

const numberLevels = createSlice({
  name: 'numberLevels',
  initialState: [] as NumberLevel[],
  reducers: {
    setNumberLevels: (state, action) => {
      return action.payload;
    },
  },
});

export const { setNumberLevels } = numberLevels.actions;

export default numberLevels.reducer;

export const fetchNumberLevel = () => async (dispatch: AppDispatch) => {
  try {
    const numberLevelsRef = firestore.collection('NumberLevel');
    const snapshot = await numberLevelsRef.get();
    const numberLevelsData = snapshot.docs.map((doc) => {
      const numberLevelsData = doc.data() as NumberLevel;
      numberLevelsData.id = doc.id;
      return numberLevelsData;
    });
    dispatch(setNumberLevels(numberLevelsData));
  } catch (error) {
    console.error('Error fetching :', error);
  }
};

export const addNumberLevel = (newNumberLevel: NumberLevel) => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    const numberLevelsRef = firestore.collection('NumberLevel');
    await numberLevelsRef.add(newNumberLevel);

    return true;
  } catch (error) {
    console.error('Error adding device:', error);
    throw error;
  }
};
