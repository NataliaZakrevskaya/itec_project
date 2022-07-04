import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getBrands } from '../../mocks';

export const fetchBrandsTC = createAsyncThunk(
  'brands/fetchBrands', ( param, { dispatch } ) => {
    const res = getBrands(); //todo позже будет APi запрос
    try {
      return { brands: res };
    } catch ( err ) {

    }
  },
);

export const slice = createSlice( {
  name: 'brands',
  initialState: {
    brands: [] as Array<BrandType>,
    chosenBrands: [] as Array<BrandType>,
    brandName: '' as string
  },
  reducers: {
    setChosenBrands( state, action ) {
      state.chosenBrands = state.brands.filter((brand: BrandType) => brand.chosen)
    },
    setBrandName( state, action: PayloadAction<{ brandName: string } > ) {
      state.brandName = action.payload.brandName
    },
    setBrandStatus( state, action: PayloadAction<{ id: number, chosen: boolean} > ) {
      const index = state.brands.findIndex(brand => brand.id === action.payload.id)
      state.brands[index].chosen = action.payload.chosen
    },
  }, extraReducers: builder => {
    builder.addCase( fetchBrandsTC.fulfilled, (
        state, action ) => {
        // @ts-ignore
      state.brands = action.payload.brands;
      },
    );
  },
} );

export const brandsReducer = slice.reducer
export const {setChosenBrands, setBrandName, setBrandStatus} = slice.actions

export type BrandType = {
  id: number,
  name: string,
  image: string,
  chosen: boolean
}