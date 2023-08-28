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
    const devicesData = snapshot.docs.map((doc) => {
      const deviceData = doc.data() as Device;
      deviceData.id = doc.id;
      return deviceData;
    });
    dispatch(setDevices(devicesData));
  } catch (error) {
    console.error('Error fetching devices:', error);
  }
};

export const addDevice = (newDevice: Device) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const state = getState();

  const duplicateId = state.devices.some((device) => device.id === newDevice.id);
  const duplicateUsername = state.devices.some((device) => device.usernameDevice === newDevice.usernameDevice);
  if (duplicateId) {
    return 'duplicate_id';
  } else if (duplicateUsername) {
    return 'duplicate_username';
  }

  try {
    const devicesRef = firestore.collection('Device').doc(newDevice.id);
    await devicesRef.set(newDevice);
    return true;
  } catch (error) {
    console.error('Error adding device:', error);
    throw error;
  }
};
export const updateDevice = (deviceId: string, updatedDevice: Device) => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    const devicesRef = firestore.collection('Device').doc(deviceId);
    await devicesRef.update(updatedDevice);

    return true;
  } catch (error) {
    console.error('Error updating device:', error);
    throw error;
  }
};
export const changeDeviceId = createAsyncThunk('devices/changeDeviceId', async ({ oldId, newId }: { oldId: string; newId: string }, { dispatch, getState }) => {
  try {
    const oldDeviceRef = firestore.collection('Device').doc(oldId);
    const oldDeviceSnapshot = await oldDeviceRef.get();
    const oldDeviceData = oldDeviceSnapshot.data() as Device;
    const newDeviceRef = firestore.collection('Device').doc(newId);
    await newDeviceRef.set(oldDeviceData);
    await oldDeviceRef.delete();
    return true;
  } catch (error) {
    console.error('Error changing device ID:', error);
    throw error;
  }
});
