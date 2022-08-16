import { getMonth } from './getMonth';

/*this feature is using to correctly display the date with the correct format*/
export const getCurrentAddedDate = ( date: Date ) => {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  return `${ day } ${ getMonth( month ) } ${ year }`;
};