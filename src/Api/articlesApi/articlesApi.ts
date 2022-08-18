import { instance } from '../config';
import { ResBrandType } from '../../mocks';
import { ARTICLES_URL } from './constants';

export const articlesAPI = {
  async setArticles() {
    return await instance.get<Array<ResBrandType>>( ARTICLES_URL );
  },
};