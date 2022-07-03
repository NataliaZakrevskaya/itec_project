export const getTitleForProductsBlock = ( activeAnimalTypeName: string | undefined) => {
  switch ( activeAnimalTypeName ) {
    case 'Собаки': {
      return 'для собак';
    }
    case 'Кошки': {
      return 'для кошек';
    }
    case 'Грызуны': {
      return 'для грызунов';
    }
    case 'Птицы': {
      return 'для птиц';
    }
    case 'Рыбки': {
      return 'для рыбок';
    }
    default:
      return '';
  }
};
export const getTitleForArticlesBlock = ( activeAnimalTypeName: string | undefined) => {
  switch ( activeAnimalTypeName ) {
    case 'Собаки': {
      return 'про собак';
    }
    case 'Кошки': {
      return 'про кошек';
    }
    case 'Грызуны': {
      return 'про грызунов';
    }
    case 'Птицы': {
      return 'про птиц';
    }
    case 'Рыбки': {
      return 'про рыбок';
    }
    default:
      return '';
  }
};