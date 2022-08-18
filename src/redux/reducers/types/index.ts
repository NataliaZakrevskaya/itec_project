import { ProductItemType } from '../../../types';

export type RequestStatusType = 'idle' | 'succeeded' | 'failed';
export type latestProductsInitialStateType = {
  results: Array<ProductItemType>,
  total_products: number,
  max_products_on_page: number,
  page_number: number,
  products_on_page: null | number,
  total_pages: number,
}
export type ProductTypesType = {
  id: number,
  name: string,
  discount_by_category: null
  chosen: boolean
}