import { AppRootStateType } from '../store';

export const getChosenOrdering = (state: AppRootStateType) => {
  return state.ordering.chosenOrdering
}