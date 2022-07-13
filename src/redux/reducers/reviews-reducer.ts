/*export const fetchReviewsTC = createAsyncThunk(
  'reviews/fetchReviews', ( param, { dispatch } ) => {
    const res = getBrands(); //todo позже будет APi запрос
    try {
      return { brands: res };
    } catch ( err ) {

    }
  },
);*/
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { reviewsAPI } from '../../Api/reviewsApi/reviewsApi';
import { ReviewsType } from '../../mocks';

export const fetchReviewsTC = createAsyncThunk(
  'reviews/fetchReviews', async ( param, { dispatch } ) => {
    const res = await reviewsAPI.setReviews(); //todo после того, как заработает бэк
    try {
      return { reviews: res.data };
    } catch ( err ) {

    }
  },
);

export const slice = createSlice( {
  name: 'reviews',
  initialState: {
    reviews: [] as Array<ReviewsType>
  },
  reducers: {},
  extraReducers: ( builder => {
    // @ts-ignore
    builder.addCase( fetchReviewsTC.fulfilled, ( state, action ) => {
      // @ts-ignore
      state.reviews  = action.payload.reviews;
    } );
  } ),
} );

export const reviewsReducer = slice.reducer;
