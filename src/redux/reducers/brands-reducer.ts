import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { brandsAPI } from '../../Api/brandsApi/brandsApi';
import { BrandType } from '../../mocks';

export const fetchBrandsTC = createAsyncThunk(
  'brands/fetchBrands', async ( param, { dispatch } ) => {
    const res = await brandsAPI.setBrands();
    try {
      return { brands: res.data };
    } catch ( err ) {

    }
  },
);

export const slice = createSlice( {
  name: 'brands',
  initialState: {
    brands: [] as Array<BrandType>,
    chosenBrandsId: [] as Array<number>,
  },
  reducers: {
    setChosenBrandId( state, action: PayloadAction<{ id: number }> ) {
      const index = state.brands.findIndex( brand => brand.id === action.payload.id );
      state.brands[ index ].chosen = true;
    },
    removeChosenBrandId( state, action: PayloadAction<{ id: number }> ) {
      const index = state.brands.findIndex( brand => brand.id === action.payload.id );
      state.brands[ index ].chosen = false;
    },
    removeChosenBrandsId( state, action ) {
      state.brands = state.brands.map( ( brand: BrandType ) => ( { ...brand, chosen: false } ) );
      state.chosenBrandsId = [];
    },
    setChosenBrandsId( state, action ) {
      state.chosenBrandsId = state.brands.filter( brand => brand.chosen ).map( brand => brand.id );
    },
  },
  extraReducers: ( builder => {
    builder.addCase( fetchBrandsTC.fulfilled, ( state, action ) => {
      // @ts-ignore
      state.brands = action.payload.brands.map( ( brand: BrandType ) => ( { ...brand, chosen: false } ) );
    } );
  } ),
} );

export const brandsReducer = slice.reducer;
export const {
  setChosenBrandId,
  removeChosenBrandsId,
  removeChosenBrandId,
  setChosenBrandsId,
} = slice.actions;