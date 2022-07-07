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
    brandsForForm: [] as Array<BrandType>,
    chosenBrandsId: [] as Array<number>,
    brandName: '' as string,
  },
  reducers: {
    setChosenBrandsId( state, action ) {
      state.chosenBrandsId = state.brandsForForm
        .filter( ( brand: BrandType ) => brand.chosen )
        .map( brand => brand.id );
    },
    removeChosenBrandsId( state, action ) {
      state.brandsForForm = state.brandsForForm.map( ( brand: BrandType ) => ( { ...brand, chosen: false } ) );
      state.chosenBrandsId = []
    },
    setBrandName( state, action: PayloadAction<{ brandName: string }> ) {
      state.brandName = action.payload.brandName;
    },
    setBrandsForFormByName (state, action){
      state.brandsForForm = state.brands.filter(brand => brand.name.toLowerCase().includes(state.brandName.toLowerCase()));
    },
    setBrandStatus( state, action: PayloadAction<{ id: number, isChosen: boolean }> ) {
      const index = state.brandsForForm.findIndex( brand => brand.id === action.payload.id );
      state.brandsForForm[ index ].chosen = action.payload.isChosen;
    },
  },
  extraReducers: ( builder => {
    // @ts-ignore
    builder.addCase( fetchBrandsTC.fulfilled, ( state, action ) => {
      // @ts-ignore
      state.brands = action.payload.brands;
      // @ts-ignore
      state.brandsForForm = action.payload.brands.map( ( brand: BrandType ) => ( { ...brand, chosen: false } ) );
    } );
  } ),
} );

export const brandsReducer = slice.reducer;
export const { setChosenBrandsId, setBrandName, setBrandStatus, removeChosenBrandsId, setBrandsForFormByName } = slice.actions;

export type BrandType = {
  id: number,
  name: string,
  image: string,
  chosen: boolean
}