import { OneProductItemType, ProductItemType } from './product';

export type OrderInfoType = {
  basketCount: number
  basketCountWithDiscount: number
  productsCount: number
  productsInBasket: Array<ProductItemType | OneProductItemType>
}