import { instance } from '../config';
import { AxiosResponse } from 'axios';
import { REFRESH_TOKEN_URL, TOKEN_URL } from './constants';
import { AuthResponseType } from '../types';

export const authApi = {
  async auth() {
    return await instance.post( TOKEN_URL, {
      username: process.env.REACT_APP_USERNAME,
      password: process.env.REACT_APP_PASSWORD,
    } );
  },
  async refresh() {
    return await instance.post<AxiosResponse<AuthResponseType>>( REFRESH_TOKEN_URL, {
      username: process.env.REACT_APP_USERNAME,
      password: process.env.REACT_APP_PASSWORD,
    } );
  },
};
