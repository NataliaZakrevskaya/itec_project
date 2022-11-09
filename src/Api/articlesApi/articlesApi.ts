import { instance } from '../config';
import { ARTICLES_URL } from './constants';

export const articlesAPI = {
  async setArticles( animal?: number | null ) {
    return await instance.get( ARTICLES_URL, {
      params: {
        animals: animal
      }
    } );
  },
  async getArticle( id: number ) {
    return await instance.get( `${ ARTICLES_URL }${ id }` );
  },
};