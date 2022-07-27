import { ProductItemType } from '../products-reducer';

export const setTotalCount = (state: any) => {
  return state.totalProductsCount = state.productsInBasket.map( ( product: ProductItemType ) => {
    if ( product.chosen_option ) {
      return product.chosen_option.quantity;
    }
    return product.options[ 0 ].quantity;
  } ).reduce( ( acc: number, current: number ) => acc + current, 0 );
}
export const setTotalSum = (state: any) => {
    return state.totalSum = state.productsInBasket.map( ( product: ProductItemType ) => {
    if ( product.chosen_option ) {
      return +product.chosen_option.price * product.chosen_option.quantity;
    }
    return +product.options[ 0 ].price * product.options[0].quantity;
  } ).reduce( ( acc: number, current: number ) => acc + current, 0 );
}