import { Action, ThunkAction, ThunkDispatch, configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/login/loginSlice';
import userReducer from './slice/login/loginSlice';
import logoReducer from './slice/logo/logoSlice';
import devicesReducer from './slice/device/deviceSlice';
import servicesReducer from './slice/service/serviceSlice';
import rolesReducer from './slice/Setting/rolesSlice';
import numberLevelsReducer from './slice/numberLevel/numberLevelSilce';
import accountsReducer from './slice/Setting/accountSlice';
import { Dispatch } from 'react';
import historySlice from './slice/Setting/historySlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    // user: userReducer,
    logo: logoReducer,
    roles: rolesReducer,
    devices: devicesReducer,
    services: servicesReducer,
    accounts: accountsReducer,
    numberLevels: numberLevelsReducer,
    historys: historySlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = Dispatch<Action<string>> & ThunkDispatch<RootState, unknown, Action<string>>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
