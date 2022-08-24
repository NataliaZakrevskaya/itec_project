import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../../Api/auth/auth';

export const fetchAuthTC = createAsyncThunk(
  'auth/fetchAuth', async ( param, { rejectWithValue } ) => {
    try {
      const res = await authApi.auth();
      localStorage.setItem( 'access', res.data.access );
      localStorage.setItem( 'refresh', res.data.refresh );
    } catch ( err ) {
      rejectWithValue( null );
    }
  },
);
