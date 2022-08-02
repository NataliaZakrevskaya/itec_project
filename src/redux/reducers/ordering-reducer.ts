import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SelectValuesTypes } from '../../Api/productsApi/types';
import { selectValues } from '../../Api/productsApi/enums';

export const slice = createSlice( {
  name: 'ordering',
  initialState: {
    chosenOrdering: selectValues.POPULARITY as SelectValuesTypes,
  },
  reducers: {
    setChosenOrdering( state, action: PayloadAction<{ ordering: SelectValuesTypes }> ) {
      state.chosenOrdering = action.payload.ordering;
    },
  },
} );

export const orderingReducer = slice.reducer;
export const { setChosenOrdering } = slice.actions;