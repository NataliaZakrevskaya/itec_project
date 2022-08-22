import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { descriptionShopAPI } from '../../Api/descriptionShopApi';
import { ShopInfoType } from '../../types';

export const fetchDescriptionShopTC = createAsyncThunk(
  'descriptionShop/fetchDescriptionShop', async ( param, { rejectWithValue } ) => {
    const res = await descriptionShopAPI.setShopInfo();
    try {
      return { descriptionShop: res.data };
    } catch ( err ) {
      rejectWithValue( null );
    }
  },
);

export const slice = createSlice( {
  name: 'descriptionShop',
  initialState: {
    id: 0,
    address: '',
    metro: '',
    time_weekdays: '',
    time_weekend: '',
    phone_number: '',
    social: '',
    maps: '',
    photo: '',
    description_shop: {
      title: '',
      main_info: '',
    },
    second_info: [ {
      id: 0,
      info_title: '',
      info_text: '',
    } ],
    personal_data_politics: '',
    info_main_page: {
      main_title: '',
      option_one: '',
      option_two: '',
      photo_main_page: '',
    },
    banners: [
      {
        title: '',
        color: '',
        image: '',
      },
    ],
  } as ShopInfoType,
  reducers: {},
  extraReducers: builder => {
    builder.addCase( fetchDescriptionShopTC.fulfilled, (
        state, action ) => {
        if ( action.payload ) return action.payload.descriptionShop;
      },
    );
  },
} );

export const descriptionShop = slice.reducer;