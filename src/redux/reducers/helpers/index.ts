import { ProductItemType } from '../../../mocks';

export const setTotalCount = ( state: any ) => {
  return state.totalProductsCount = state.productsInBasket.map( ( product: ProductItemType ) => {
    if ( product.chosen_option.partial ) {
      return 1;
    } else {
      return product.chosen_option.quantity;
    }
  } )
    .reduce( ( acc: number, current: number ) => acc + current, 0 );
};
export const setTotalSumWithDiscount = ( state: any ) => {
  return state.totalSumWithDiscount = state.productsInBasket.map( ( product: ProductItemType ) => {
    if ( product.discountproduct ) {
      return ( +product.chosen_option.price - ( +product.chosen_option.price / 100 * product.discountproduct.discount_amount ) ) * product.chosen_option.quantity;
    }
    if ( product.chosen_option.discountproductoption ) {
      return ( +product.chosen_option.price - ( +product.chosen_option.price / 100 * product.chosen_option.discountproductoption.discount_amount ) ) * product.chosen_option.quantity;
    } else return +product.chosen_option.price * product.chosen_option.quantity;
  } )
    .reduce( ( acc: number, current: number ) => acc + current, 0 ).toFixed( 2 );
};
export const setTotalSum = ( state: any ) => {
  return state.totalSum = state.productsInBasket.map( ( product: ProductItemType ) => +product.chosen_option.price * product.chosen_option.quantity )
    .reduce( ( acc: number, current: number ) => acc + current, 0 ).toFixed( 2 );
};