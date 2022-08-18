import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SelectValuesTypes } from '../../Api/productsApi';
import { selectValues } from '../../enums';

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

export const ordering = slice.reducer;
export const { setChosenOrdering } = slice.actions;