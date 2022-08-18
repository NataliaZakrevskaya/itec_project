import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { articlesAPI } from '../../Api/articlesApi';
import { ArticleType } from '../../types';

export const fetchArticlesTC = createAsyncThunk(
  'articles/fetchArticles', async ( param, { dispatch } ) => {
    const res = await articlesAPI.setArticles();
    try {
      return { articles: res.data };
    } catch ( err ) {

    }
  },
);

export const slice = createSlice( {
  name: 'articles',
  initialState: {
    articles: [] as Array<ArticleType>,
  },
  reducers: {},
  extraReducers: ( builder => {
    builder.addCase( fetchArticlesTC.fulfilled, ( state, action ) => {
      // @ts-ignore
      state.articles = action.payload.articles;
    } );
  } ),
} );

export const articles = slice.reducer;