import {StoreSlices} from '../const/const';
import {combineReducers} from '@reduxjs/toolkit';
import {storeData} from './slices/store-data/store-data';
import {storeProcesses} from './slices/store-processes/store-processes';
import {storeUser} from './slices/store-user/store-user';

export const rootReducer = combineReducers({
  [StoreSlices.StoreData]: storeData.reducer,
  [StoreSlices.StoreProcesses]: storeProcesses.reducer,
  [StoreSlices.StoreUser]: storeUser.reducer,
});
