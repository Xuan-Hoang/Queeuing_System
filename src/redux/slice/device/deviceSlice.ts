import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { firestore } from '../../../config/firebaseConfig';
import { AppDispatch, RootState } from '../../store';
import { Device } from '../../../types/deviceType';

const deviceSlice = createSlice({
  name: 'devices',
  initialState: [] as Device[],
  reducers: {
    setDevices: (state, action) => {
      return action.payload;
    },
  },
});

export const { setDevices } = deviceSlice.actions;

export default deviceSlice.reducer;

export const fetchDevices = () => async (dispatch: AppDispatch) => {
  try {
    const devicesRef = firestore.collection('Device');
    const snapshot = await devicesRef.get();
    const devicesData = snapshot.docs.map((doc) => doc.data() as Device);
    dispatch(setDevices(devicesData));
  } catch (error) {
    console.error('Error fetching devices:', error);
  }
};

export const addDevice = (newDevice: Device) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const state = getState();
  const isDuplicate = state.devices.some((device) => device.idDevice === newDevice.idDevice);

  if (isDuplicate) {
    throw new Error('Device ID is already present.');
  }
  try {
    const devicesRef = firestore.collection('Device');
    await devicesRef.add(newDevice);
    return true;
  } catch (error) {
    console.error('Error adding device:', error);
    throw error;
  }
};
