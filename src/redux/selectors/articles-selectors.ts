import { AppRootStateType } from '../store';

export const getArticles = ( state: AppRootStateType ) => {
  return state.articles.articles;
};