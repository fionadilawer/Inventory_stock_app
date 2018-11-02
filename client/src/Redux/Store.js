import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import UserReducer from './user/Auth.slice'
import storage from 'redux-persist/lib/storage';


//you can add many reducer here...
const rootReducer = combineReducers({
    user: UserReducer
});

const persistConfig = {
    key: 'root',
    storage, 
    version: 1,
};

//storing it in a local storage
const persistReducer2 = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistReducer2,
  //added a middleware to avoid error 
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store);

