import { ProductItemType } from '../products-reducer';

export const setTotalCount = ( state: any ) => {
  return state.totalProductsCount = state.productsInBasket.map( ( product: ProductItemType ) => product.chosen_option.quantity )
    .reduce( ( acc: number, current: number ) => acc + current, 0 );
};
export const setTotalSum = ( state: any ) => {
  return state.totalSum = state.productsInBasket.map( ( product: ProductItemType ) => +product.chosen_option.price * product.chosen_option.quantity )
    .reduce( ( acc: number, current: number ) => acc + current, 0 );
};