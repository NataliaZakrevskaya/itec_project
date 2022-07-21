

export const getTitleForProductsBlock = ( chosenAnimalTypeId: number | null) => {
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

export const getTitleForArticlesBlock = ( chosenAnimalTypeId: number | null) => {
  switch ( chosenAnimalTypeId ) {
    case 0: {
      return 'про собак';
    }
    case 1: {
      return 'про кошек';
    }
    case 2: {
      return 'про грызунов';
    }
    case 3: {
      return 'про птиц';
    }
    case 4: {
      return 'про рыбок';
    }
    default:
      return '';
  }
};