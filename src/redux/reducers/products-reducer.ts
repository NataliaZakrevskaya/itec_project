import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AnimalTypesType, OptionType } from '../../mocks';
import { setProductRequest } from './app-reducer';
import { RequestStatus } from './enums';
import { productsAPI } from '../../Api/productsApi/productsApi';

export const fetchProductsTC = createAsyncThunk(
  'products/fetchProducts', async ( param: { page?: number, animal: number | null, category: number | null, ordering?: any, brands: string | null }, {
    dispatch,
    rejectWithValue,
  } ) => {
    try {
      const res = await productsAPI.setProducts( param.animal, param.category, param.brands, param.page, param.ordering );
      dispatch( setProductRequest( { status: RequestStatus.SUCCEEDED } ) );
      return { products: res.data };
    } catch ( err ) {
      dispatch( setProductRequest( { status: RequestStatus.FAILED } ) );
      rejectWithValue( null );
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
    setChosenOptionToProduct( state, action: PayloadAction<{ productId: number, option: OptionType }> ) {
      const index = state.results.findIndex( product => product.id === action.payload.productId );
      state.results[ index ].chosen_option = action.payload.option;
    },
  },
  extraReducers: ( builder => {
    // @ts-ignore
    builder.addCase( fetchProductsTC.fulfilled, ( state, action ) => {
      return action.payload?.products;
    } );
  } ),
} );

export const productsReducer = slice.reducer;
export const { setActualPage, setChosenOptionToProduct } = slice.actions;

export type ProductItemType = {
  id: number,
  name: string,
  animal: Array<AnimalTypesType>
  images: Array<{ id: number, image: string }>,
  discountproduct: {
    title: string,
    discount_amount: number,
    product_id: number
  } | null,
  description: string,
  features: string,
  composition: string,
  additives: string,
  analysis: string,
  brand: { id: number, name: string, image: string },
  category: { id: number, name: string, is_active: boolean, },
  options: Array<OptionType>,
  chosen_option: OptionType
}