import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunkMiddleware from 'redux-thunk';
import { animalTypes } from './reducers/animalTypes';
import { brands } from './reducers/brands';
import { productTypes } from './reducers/productTypes';
import { basket } from './reducers/basket';
import { products } from './reducers/products';
import { reviews } from './reducers/reviews';
import { articles } from './reducers/articles';
import { app } from './reducers/app';
import { productsFromSearch } from './reducers/productsFromSearch';
import { latestProducts } from './reducers/latestProducts';
import { popularProducts } from './reducers/popularProducts';
import { product } from './reducers/product';
import { oneClickOrderReducer } from './reducers/onClickOrder';
import { ordering } from './reducers/ordering';
import { previouslyProducts } from './reducers/previouslyProducts';
import { descriptionShop } from './reducers/descriptionShop';
import { discounts } from './reducers/discounts';

const rootReducer = combineReducers( {
  app: app,
  animalTypes: animalTypes,
  brands: brands,
  productTypes: productTypes,
  basket: basket,
  oneClickOrder: oneClickOrderReducer,
  product: product,
  products: products,
  productsFromSearch: productsFromSearch,
  latestProducts: latestProducts,
  popularProducts: popularProducts,
  previouslyProducts: previouslyProducts,
  reviews: reviews,
  articles: articles,
  ordering: ordering,
  descriptionShop: descriptionShop,
  discounts: discounts,
} );

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [ 'products', 'productsFromSearch', 'latestProducts', 'popularProducts', 'product' ],
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

