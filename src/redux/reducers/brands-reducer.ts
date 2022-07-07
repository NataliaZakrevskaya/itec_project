import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { brandsAPI } from '../../Api/brandsApi/brandsApi';

/*export const fetchBrandsTC = createAsyncThunk(
  'brands/fetchBrands', ( param, { dispatch } ) => {
    const res = getBrands(); //todo позже будет APi запрос
    try {
      return { brands: res };
    } catch ( err ) {

    }
  },
);*/
export const fetchBrandsTC = createAsyncThunk(
  'brands/fetchBrands', async ( param, { dispatch } ) => {
    const res = await brandsAPI.setBrands(); //todo после того, как заработает бэк
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
    brandName: '' as string,
  },
  reducers: {
    setChosenBrandId( state, action: PayloadAction<{ id: number }>   ) {
      state.chosenBrandsId.push(action.payload.id)
    },
    removeChosenBrandsId( state, action ) {
      state.brands = state.brands.map( ( brand: BrandType ) => ( { ...brand, chosen: false } ) );
      state.chosenBrandsId = []
    },
    removeChosenBrandId( state, action: PayloadAction<{ id: number }>  ) {
       state.chosenBrandsId = state.chosenBrandsId.filter( id => id !== action.payload.id );
    },
    setBrandName( state, action: PayloadAction<{ brandName: string }> ) {
      state.brandName = action.payload.brandName;
    },
    setBrandsForFormByName (state, action){
      state.brands = state.brands.filter(brand => brand.name.toLowerCase().includes(state.brandName.toLowerCase()));
    },
  },
  extraReducers: ( builder => {
    // @ts-ignore
    builder.addCase( fetchBrandsTC.fulfilled, ( state, action ) => {
      // @ts-ignore
      state.brands  = action.payload.brands.map( ( brand: BrandType ) => ( { ...brand, chosen: false } ) );
    } );
  } ),
} );

export const brandsReducer = slice.reducer;
export const { setChosenBrandId, setBrandName, removeChosenBrandsId, removeChosenBrandId, setBrandsForFormByName } = slice.actions;

export type BrandType = {
  id: number,
  name: string,
  image: string,
  chosen: boolean
}