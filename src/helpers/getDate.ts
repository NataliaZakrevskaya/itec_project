import { getMonth } from './getMonth';

export const getCurrentAddedDate = ( date: Date ) => {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  return `${ day } ${ getMonth( month ) } ${ year }`;
};