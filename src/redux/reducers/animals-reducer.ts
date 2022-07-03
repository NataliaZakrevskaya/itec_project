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
    totalCount: null as number | null,
    activeAnimalType: null as AnimalTypesType | null,
  },
  reducers: {
    setActiveAnimalType( state, action: PayloadAction<{ type: AnimalTypesType } > ) {
      state.activeAnimalType = action.payload.type;
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
export const {setActiveAnimalType} = slice.actions

