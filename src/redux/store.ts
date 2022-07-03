import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers( {} );

export const store = configureStore( {
  reducer: rootReducer,
} );

export type RootReducerType = typeof rootReducer
export type AppRootStateType = ReturnType<RootReducerType>