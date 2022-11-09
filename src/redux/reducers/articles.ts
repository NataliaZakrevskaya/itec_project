import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { articlesAPI } from '../../Api/articlesApi';
import { ArticleType } from '../../types';

export const fetchArticlesTC = createAsyncThunk(
  'articles/fetchArticles', async ( param: { chosenAnimalId?: number | null }, { dispatch } ) => {
    const res = await articlesAPI.setArticles( param.chosenAnimalId );
    try {
      return { articles: res.data };
    } catch ( err ) {

    }
  },
);

export const slice = createSlice( {
  name: 'articles',
  initialState: [] as Array<ArticleType>,
  reducers: {},
  extraReducers: ( builder => {
    builder.addCase( fetchArticlesTC.fulfilled, ( state, action ) => {
      if ( action.payload ) return action.payload.articles;
    } );
  } ),
} );

export const articles = slice.reducer;