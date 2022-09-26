import { instance } from '../config';
import { ARTICLES_URL } from './constants';

export const articlesAPI = {
  async setArticles() {
    return await instance.get( ARTICLES_URL );
  },
  async getArticle( id: number ) {
    return await instance.get( `${ ARTICLES_URL }${ id }` );
  },
};