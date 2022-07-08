import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProductItems, getWithThisProductsBuy, OptionType } from '../../mocks';
import { selectValues } from '../../Api/productsApi/enums';

/*export const fetchProductsTC = createAsyncThunk(
  'products/fetchProducts', async ( param, { dispatch } ) => {
    const res = await productsAPI.setProducts(); //todo после того, как заработает бэк
    try {
      return { products: res.data };
    } catch ( err ) {

    }
  },
);*/
/*export const fetchWithThisProductByProductsTC = createAsyncThunk(
  'products/fetchProducts', async ( param, { dispatch } ) => {
    const res = await productsAPI.setWithThisProductByProducts(); //todo после того, как заработает бэк
    try {
      return { products: res.data };
    } catch ( err ) {

    }
  },
);*/
/*export const fetchPopularProductsTC = createAsyncThunk(
  'products/fetchPopularProducts', async ( param, { dispatch } ) => {
    const res = await productsAPI.setPopularProductsTC(); //todo после того, как заработает бэк
    try {
      return { products: res.data };
    } catch ( err ) {

    }
  },
);*/
/*export const fetchLatestProductsTC = createAsyncThunk(
  'products/fetchLatestProducts', async ( param, { dispatch } ) => {
    const res = await productsAPI.setLatestProductsTC(); //todo после того, как заработает бэк
    try {
      return { products: res.data };
    } catch ( err ) {

    }
  },
);*/

export const fetchProductsTC = createAsyncThunk(
  'products/fetchProducts', ( param, { dispatch } ) => {
    const res = getProductItems(); //todo позже будет APi запрос
    try {
      return { products: res };
    } catch ( err ) {

    }
  },
);
export const fetchWithThisProductByProductsTC = createAsyncThunk(
  'products/fetchWithThisProductByProducts', ( param, { dispatch } ) => {
    const res = getWithThisProductsBuy(); //todo позже будет APi запрос
    try {
      return { products: res };
    } catch ( err ) {

    }
  },
);
export const fetchPopularProductsTC = createAsyncThunk(
  'products/fetchPopularProducts', ( param, { dispatch } ) => {
    const res = getProductItems(); //todo позже будет APi запрос
    try {
      return { popularProducts: res };
    } catch ( err ) {

    }
  },
);
export const fetchLatestProductsTC = createAsyncThunk(
  'products/fetchLatestProducts', ( param, { dispatch } ) => {
    const res = getProductItems(); //todo позже будет APi запрос
    try {
      return { latestProducts: res };
    } catch ( err ) {

    }
  },
);
export const fetchPreviouslyProductsTC = createAsyncThunk(
  'products/fetchPreviouslyProducts', ( param, { dispatch } ) => {
    const res = getProductItems(); //todo позже будет APi запрос
    try {
      return { previouslyProducts: res };
    } catch ( err ) {

    }
  },
);

export const slice = createSlice( {
  name: 'products',
  initialState: {
    products: [] as Array<ProductItemType>,
    withThisProductBy: [] as Array<ProductItemType>,
    previouslyProducts: [] as Array<ProductItemType>,
    popularProducts: [] as Array<ProductItemType>,
    latestProducts: [] as Array<ProductItemType>,
    totalProductsCount: 0 as number,
    maxProductItemsOnPage: 10 as number,
    pageNumber: 1 as number,
    productName: '' as string,
    selectSort: selectValues.ADDED_DATE,
  },
  reducers: {
    /*setToPreviouslyProducts( state, action: PayloadAction<{ product: ProductItemType }>   ) {
      state.previouslyProducts.unshift(action.payload.product)
    },*/
  },
  extraReducers: ( builder => {
    builder.addCase( fetchProductsTC.fulfilled, ( state, action ) => {
      // @ts-ignore
      state.products = action.payload.products
    } );
    builder.addCase( fetchWithThisProductByProductsTC.fulfilled, ( state, action ) => {
      // @ts-ignore
      state.withThisProductBy = action.payload.products
    } );
    builder.addCase( fetchPopularProductsTC.fulfilled, ( state, action ) => {
      // @ts-ignore
      state.popularProducts = action.payload.popularProducts
    } );
    builder.addCase( fetchLatestProductsTC.fulfilled, ( state, action ) => {
      // @ts-ignore
      state.latestProducts = action.payload.latestProducts
    } );
    builder.addCase( fetchPreviouslyProductsTC.fulfilled, ( state, action ) => {
      // @ts-ignore
      state.previouslyProducts = action.payload.previouslyProducts
    } );
  } ),
} );

export const productsReducer = slice.reducer;

export type ProductItemType = {
  id: number,
  name: string,
  images: Array<{ id: number, image: string, product: 0 }>,
  description: string,
  features: string,
  composition: string,
  additives: string,
  analysis: string,
  date_added: string,
  unit: string,
  animal: { id: number, name: string, image: string },
  brand: { id: number, name: string, image: string },
  product_type: { id: number, name: string, is_active: true },
  options: Array<OptionType>
}