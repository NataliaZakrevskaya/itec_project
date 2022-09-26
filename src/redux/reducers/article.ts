import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { articlesAPI } from '../../Api/articlesApi';
import { ArticleType } from '../../types';

export const fetchArticleTC = createAsyncThunk(
  'articles/fetchArticles', async ( params: { id: number }, { dispatch } ) => {
    const res = await articlesAPI.getArticle( params.id );
    try {
      return { article: res.data };
    } catch ( err ) {

    }
  },
);

export const slice = createSlice( {
  name: 'article',
  initialState: {
    id: 0,
    title: '',
    description: '',
    time_read: 0,
    date_added: '',
    image: '',
    is_active: false,
    animals: 0,
  } as ArticleType,
  reducers: {},
  extraReducers: ( builder => {
    builder.addCase( fetchArticleTC.fulfilled, ( state, action ) => {
      if ( action.payload ) return action.payload.article;
    } );
  } ),
} );

export const article = slice.reducer;