import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunkMiddleware from 'redux-thunk';
import { animalTypesReducer } from './reducers/animalTypes-reducer';
import { brandsReducer } from './reducers/brands-reducer';
import { productTypesReducer } from './reducers/productTypes-reducer';
import { basketReducer } from './reducers/basket-reducer';
import { productsReducer } from './reducers/products-reducer';
import { reviewsReducer } from './reducers/reviews-reducer';
import { articlesReducer } from './reducers/articles-reducer';
import { appReducer } from './reducers/app-reducer';
import { productsFromSearchReducer } from './reducers/productsFromSearch-reducer';
import { latestProductsReducer } from './reducers/latestProducts-reducer';
import { popularProductsReducer } from './reducers/popularProducts-reducer';
import { productReducer } from './reducers/product-reducer';

const rootReducer = combineReducers( {
  app: appReducer,
  animalTypes: animalTypesReducer,
  brands: brandsReducer,
  productTypes: productTypesReducer,
  basket: basketReducer,
  product: productReducer,
  products: productsReducer,
  productsFromSearch: productsFromSearchReducer,
  latestProducts: latestProductsReducer,
  popularProducts: popularProductsReducer,
  reviews: reviewsReducer,
  articles: articlesReducer,
} );

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['products', 'productsFromSearch', 'latestProducts', 'popularProducts', 'product' ]
};

const persistedReducer = persistReducer( persistConfig, rootReducer );

const store = configureStore( {
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware( {
    serializableCheck: {
      ignoredActions: [ FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER ],
    },
  } ).prepend( thunkMiddleware ),
} );

export const persistor = persistStore( store );
export default store;

export type RootReducerType = typeof rootReducer
export type AppRootStateType = ReturnType<RootReducerType>
export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store;

