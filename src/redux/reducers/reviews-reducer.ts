import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { reviewsAPI } from '../../Api/reviewsApi/reviewsApi';
import { ReviewsType } from '../../mocks';
import { setSendingReviewRequestStatus } from './app-reducer';
import { RequestStatus } from './enums';

export const fetchReviewsTC = createAsyncThunk(
  'reviews/fetchReviews', async ( param, { dispatch } ) => {
    const res = await reviewsAPI.setReviews();
    try {
      return { reviews: res.data };
    } catch ( err ) {
    }
  },
);
export const sendReviewTC = createAsyncThunk(
  'reviews/sendReview', async ( param: { nameAuthor: string, phoneNumber: string, nameAnimal: string, bodyOfComment: string }, { dispatch, rejectWithValue } ) => {
    try {
      await reviewsAPI.sendReview( param.nameAuthor, param.phoneNumber, param.nameAnimal, param.bodyOfComment );
      dispatch(setSendingReviewRequestStatus({status: RequestStatus.SUCCEEDED}));
    } catch ( err ) {
      dispatch(setSendingReviewRequestStatus({status: RequestStatus.FAILED}));
      rejectWithValue(null);
    }
  },
);

export const slice = createSlice( {
  name: 'reviews',
  initialState: {
    reviews: [] as Array<ReviewsType>,
  },
  reducers: {},
  extraReducers: ( builder => {
    builder.addCase( fetchReviewsTC.fulfilled, ( state, action ) => {
      // @ts-ignore
      state.reviews = action.payload.reviews;
    } );
  } ),
} );

export const reviewsReducer = slice.reducer;
