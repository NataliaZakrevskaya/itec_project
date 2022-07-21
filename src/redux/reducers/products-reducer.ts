import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AnimalTypesType, getProductItems, getWithThisProductsBuy, OptionType } from '../../mocks';
import { setProductRequest } from './app-reducer';
import { RequestStatus } from './enums';
import { productsAPI } from '../../Api/productsApi/productsApi';

export const fetchProductsTC = createAsyncThunk(
  'products/fetchProducts', async ( param: { page?: number, page_size?: number, animal?: number, category?: number, ordering?: any, chosenBrands?: Array<number> }, {
    dispatch,
    rejectWithValue,
  } ) => {
    /*const brands = {...param.chosenBrands.map(brand => `brand: ${brand}`)}*/
    try {
      const res = await productsAPI.setProducts( param.page, param.ordering, param.page_size, param.animal, param.category/*, brands*/ );
      dispatch( setProductRequest( { status: RequestStatus.SUCCEEDED } ) );
      return { products: res.data };
    } catch ( err ) {
      dispatch( setProductRequest( { status: RequestStatus.FAILED } ) );
      rejectWithValue( null );
    }
  },
);
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

/*export const fetchProductsTC = createAsyncThunk(
  'products/fetchProducts', ( param, { dispatch } ) => {
    const res = getProductItems(); //todo позже будет APi запрос
    try {
      dispatch( setProductRequest( { status: RequestStatus.SUCCEEDED } ) );
      return { products: res };
    } catch ( err ) {
      dispatch( setProductRequest( { status: RequestStatus.FAILED } ) );
    }
  },
);*/
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
/*export const fetchLatestProductsTC = createAsyncThunk(
  'products/fetchLatestProducts', ( param, { dispatch } ) => {
    const res = getProductItems(); //todo позже будет APi запрос
    try {
      return { latestProducts: res };
    } catch ( err ) {

    }
  },
);*/
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
    results: [] as Array<ProductItemType>,
    total_products: 0 as number,
    max_products_on_page: 15 as number,
    page_number: 1 as number,
    products_on_page: null as null | number,
    total_pages: 1 as number,
  },
  reducers: {
    setActualPage( state, action: PayloadAction<{ pageNumber: number }> ) {
      state.page_number = action.payload.pageNumber;
    },
  },
  extraReducers: ( builder => {
    builder.addCase( fetchProductsTC.fulfilled, ( state, action ) => {
      if ( action.payload ) {
        return action.payload.products;
      }
    } );
  } ),
} );

export const productsReducer = slice.reducer;
export const { setActualPage } = slice.actions;

export type ProductItemType = {
  id: number,
  name: string,
  animal: Array<AnimalTypesType>
  images: Array<{ id: number, image: string }>,
  description: string,
  features: string,
  composition: string,
  additives: string,
  analysis: string,
  brand: { id: number, name: string, image: string },
  category: { id: number, name: string, is_active: true, },
  options: Array<OptionType>
}