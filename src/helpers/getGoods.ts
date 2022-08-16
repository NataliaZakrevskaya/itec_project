/*this feature is used to correctly display a word item with different number of products in the basket*/
export const getGoods = ( countOfGoods: number ) => {
  if ( countOfGoods === 11 || countOfGoods === 12 || countOfGoods === 13 || countOfGoods === 14 ) {
    return 'товаров';
  } else {
    const array = String( countOfGoods ).split( '' );
    const lastNumber = array[ array.length - 1 ];
    switch ( +lastNumber ) {
      case 0: {
        return 'товаров';
      }
      case 1: {
        return 'товар';
      }
      case 2: {
        return 'товара';
      }
      case 3: {
        return 'товара';
      }
      case 4: {
        return 'товара';
      }
      case 5: {
        return 'товаров';
      }
      case 6: {
        return 'товаров';
      }
      case 7: {
        return 'товаров';
      }
      case 8: {
        return 'товаров';
      }
      case 9: {
        return 'товаров';
      }
      default:
        return 'товаров';
    }
  }
};