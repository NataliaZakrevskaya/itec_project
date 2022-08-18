import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { animalTypesAPI } from '../../Api/animalTypesApi';
import { AnimalTypesType } from '../../types';

export const fetchAnimalTypesTC = createAsyncThunk(
  'animalTypes/fetchAnimalTypes', async ( param, { dispatch, rejectWithValue } ) => {
    const res = await animalTypesAPI.setAnimalTypes();
    try {
      return { animalTypes: res.data };
    } catch ( err ) {
      rejectWithValue(null)
    }
  },
);

export const slice = createSlice( {
  name: 'animalTypes',
  initialState: {
    animalTypes: [] as Array<AnimalTypesType>,
    chosenAnimalTypeId: null as number | null,
  },
  reducers: {
    setChosenAnimalTypeId( state, action: PayloadAction<{ id: number }> ) {
      state.chosenAnimalTypeId = action.payload.id;
    },
    removeChosenAnimalTypeId( state, action ) {
      state.chosenAnimalTypeId = null;
    },
  }, extraReducers: builder => {
    builder.addCase( fetchAnimalTypesTC.fulfilled, (
        state, action ) => {
        // @ts-ignore
        state.animalTypes = action.payload.animalTypes;
      },
    );
  },
} );

export const animalTypes = slice.reducer;
export const { setChosenAnimalTypeId, removeChosenAnimalTypeId } = slice.actions;

