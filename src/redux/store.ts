import { combineReducers, configureStore } from '@reduxjs/toolkit';
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
import storage from 'redux-persist/lib/storage';
import thunkMiddleware from 'redux-thunk';
import { animalTypesReducer } from './reducers/animalTypes-reducer';
import { brandsReducer } from './reducers/brands-reducer';
import { productTypesReducer } from './reducers/productTypes-reducer';
import { basketReducer } from './reducers/basket-reducer';

const rootReducer = combineReducers( {
  animalTypes: animalTypesReducer,
  brands: brandsReducer,
  productTypes: productTypesReducer,
  basket: basketReducer,
} );

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore( {
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).prepend( thunkMiddleware ),
} );

export const persistor = persistStore(store);
export default store;

export type RootReducerType = typeof rootReducer
export type AppRootStateType = ReturnType<RootReducerType>

// @ts-ignore
window.store = store;

