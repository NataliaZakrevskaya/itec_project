import { AppRootStateType } from '../store';

export const getChosenOrdering = ( state: AppRootStateType ) => state.ordering.chosenOrdering;
