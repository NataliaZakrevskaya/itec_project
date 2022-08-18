import { instance } from '../config';
import { ARTICLES_URL } from './constants';
import { ResBrandType } from '../../types';

export const articlesAPI = {
  async setArticles() {
    return await instance.get<Array<ResBrandType>>( ARTICLES_URL );
  },
};