import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { apiRequestMiddleware } from './middleware';

import reducers from './reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['favorites'],
  blacklist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const middlewares = [apiRequestMiddleware];

const store = createStore(persistedReducer, applyMiddleware(...middlewares));
const persistor = persistStore(store);

export default { store, persistor };
