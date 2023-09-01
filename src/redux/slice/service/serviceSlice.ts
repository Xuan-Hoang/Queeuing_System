import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { firestore } from '../../../config/firebaseConfig';

import { Service } from '../../../types/serviceType';
import { AppDispatch, RootState } from '../../store';

const serviceSlice = createSlice({
  name: 'services',
  initialState: [] as Service[],
  reducers: {
    setSevices: (state, action) => {
      return action.payload;
    },
  },
});

export const { setSevices } = serviceSlice.actions;

export default serviceSlice.reducer;

export const fetchSevices = () => async (dispatch: AppDispatch) => {
  try {
    const servicesRef = firestore.collection('Service');
    const snapshot = await servicesRef.get();
    const servicesData = snapshot.docs.map((doc) => {
      const serviceData = doc.data() as Service;
      serviceData.id = doc.id;
      return serviceData;
    });
    dispatch(setSevices(servicesData));
  } catch (error) {
    console.error('Error fetching services:', error);
  }
};
export const addService = (newService: Service) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const state = getState();

  const duplicateId = state.services.some((service) => service.id === newService.id);

  if (duplicateId) {
    return 'duplicate_id';
  }

  try {
    const servicesRef = firestore.collection('Service').doc(newService.id);
    await servicesRef.set(newService);
    return true;
  } catch (error) {
    console.error('Error adding device:', error);
    throw error;
  }
};
export const updateService = (serviceId: string, updatedService: Service) => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    const servicesRef = firestore.collection('Service').doc(serviceId);
    await servicesRef.update(updatedService);
    return true;
  } catch (error) {
    console.error('Error updating device:', error);
    throw error;
  }
};
export const changeServiceId = createAsyncThunk('services/changeServiceId', async ({ oldId, newId }: { oldId: string; newId: string }, { dispatch, getState }) => {
  try {
    const oldServiceRef = firestore.collection('Service').doc(oldId);
    const oldServiceSnapshot = await oldServiceRef.get();
    const oldDeviceData = oldServiceSnapshot.data() as Service;
    const newServiceRef = firestore.collection('Service').doc(newId);
    await newServiceRef.set(oldDeviceData);
    await oldServiceRef.delete();
    return true;
  } catch (error) {
    console.error('Error changing device ID:', error);
    throw error;
  }
});
