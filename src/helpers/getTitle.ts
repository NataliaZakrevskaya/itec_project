/*these features are used for showing correct block's titles with different chosen animal types*/

import { Nullable } from '../types';

export const getTitleForProductsBlock = ( chosenAnimalTypeId: Nullable<number> ) => {
  switch ( chosenAnimalTypeId ) {
    case 1: {
      return 'для собак';
    }
    case 2: {
      return 'для кошек';
    }
    case 3: {
      return 'для грызунов';
    }
    case 4: {
      return 'для птиц';
    }
    case 5: {
      return 'для рыбок';
    }
    default:
      return '';
  }
};

export const getTitleForArticlesBlock = ( chosenAnimalTypeId: Nullable<number> ) => {
  switch ( chosenAnimalTypeId ) {
    case 1: {
      return 'про собак';
    }
    case 2: {
      return 'про кошек';
    }
    case 3: {
      return 'про грызунов';
    }
    case 4: {
      return 'про птиц';
    }
    case 5: {
      return 'про рыбок';
    }
    default:
      return '';
  }
};