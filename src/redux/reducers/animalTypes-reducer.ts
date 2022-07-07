import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AnimalTypesType } from '../../mocks';
import { animalTypesAPI } from '../../Api/animalTypesApi/animalTypesApi';

/*export const fetchAnimalTypesTC = createAsyncThunk(
  'animalTypes/fetchAnimalTypes',  async ( param, { dispatch } ) => {
    const res = await animalTypesAPI.setAnimalTypes(); //todo когда будет готов бэк
    console.log(res);
    try {
      return { animalTypes: res };
    } catch ( err ) {
      console.log(err);
    }
  },
);*/

export const fetchAnimalTypesTC = createAsyncThunk(
  'animalTypes/fetchAnimalTypes',   async( param, { dispatch } ) => {
    const res =  await animalTypesAPI.setAnimalTypes(); //todo пока нет бэка
    try {
      return { animalTypes: res.data };
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

export const animalTypesReducer = slice.reducer;
export const { setChosenAnimalTypeId, removeChosenAnimalTypeId } = slice.actions;

