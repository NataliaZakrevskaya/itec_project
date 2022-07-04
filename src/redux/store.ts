import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import { animalTypesReducer } from './reducers/animalTypes-reducer';
import { brandsReducer } from './reducers/brands-reducer';
import { productTypesReducer } from './reducers/productTypes-reducer';

const rootReducer = combineReducers( {
  animalTypes: animalTypesReducer,
  brands: brandsReducer,
  productTypes: productTypesReducer,
} );

export const store = configureStore( {
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend( thunkMiddleware ),
} );

export type RootReducerType = typeof rootReducer
export type AppRootStateType = ReturnType<RootReducerType>

// @ts-ignore
window.store = store;