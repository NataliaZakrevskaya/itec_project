import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AnimalTypesType, getAnimalTypes } from '../../mocks';

export const fetchAnimalTypesTC = createAsyncThunk(
  'animalTypes/fetchAnimalTypes', ( param, { dispatch } ) => {
    const res = getAnimalTypes(); //todo позже будет APi запрос
    try {
      return { animalTypes: res };
    } catch ( err ) {

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
    setChosenAnimalTypeId( state, action: PayloadAction<{ id: number } > ) {
      state.chosenAnimalTypeId = action.payload.id;
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

export const animalTypesReducer = slice.reducer
export const {setChosenAnimalTypeId} = slice.actions

