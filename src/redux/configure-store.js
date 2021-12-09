import {configureStore} from '@reduxjs/toolkit';
import userReducer from './reducers/UserReducer';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import likeReducer from './reducers/LikeReducer';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
};

const userPersistedReducer = persistReducer(persistConfig, userReducer);
const likePersistedReducer = persistReducer(persistConfig, likeReducer);

export const store = configureStore({
  reducer: {
    user: userPersistedReducer,
    like: likePersistedReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
