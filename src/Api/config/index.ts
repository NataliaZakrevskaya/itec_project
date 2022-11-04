import axios from 'axios';
import { REFRESH_TOKEN_URL } from '../auth/constants';

export const instance = axios.create( {
  baseURL: process.env.REACT_APP_BACK_URL,
} );
export const postInstance = axios.create( {
  baseURL: process.env.REACT_APP_BACK_URL,
} );
postInstance.interceptors.request.use( ( config ) => {
  if ( config.headers ) {
    config.headers.Authorization = `Bearer ${ localStorage.getItem( 'access' ) }`;
    return config;
  }
} );
postInstance.interceptors.response.use( function ( response ) {
    // что-то делаем с данными ответа
    return response;
  }, async ( error ) => {
    const originalRequest = error.config;
    if ( error.response.status === 401 && error.config && !error.config._isRetry ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.post( `${ process.env.REACT_APP_BACK_URL }${ REFRESH_TOKEN_URL }`, { refresh: localStorage.getItem( 'refresh' ) } );
        localStorage.setItem( 'access', response.data.access );
        return postInstance.request( originalRequest );
      } catch ( error ) {

      }
    }
    throw error;
  },
);

