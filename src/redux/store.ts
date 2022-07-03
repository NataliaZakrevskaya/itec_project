import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import { animalTypesReducer } from './reducers/animals-reducer';

const rootReducer = combineReducers( {
  animalTypes: animalTypesReducer
} );

export const store = configureStore( {
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend( thunkMiddleware ),
} );

export type RootReducerType = typeof rootReducer
export type AppRootStateType = ReturnType<RootReducerType>

// @ts-ignore
window.store = store;