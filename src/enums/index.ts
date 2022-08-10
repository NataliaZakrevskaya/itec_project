export enum location {
  CATALOG = 'catalog',
  POPULAR_PRODUCTS = 'popularProducts',
  LATEST_PRODUCTS = 'latestProducts',
  WITH_THIS_PRODUCT_BUY = 'withThisProductsBuy',
  PREVIOUSLY_PRODUCTS = 'previouslyProducts',
  BASKET = 'basket',
  ONE_CLICK_ORDER = 'oneClickOrder',
  CHECKOUT = 'checkout'
}

export type LocationsType =
  'catalog'
  | 'popularProducts'
  | 'latestProducts'
  | 'withThisProductsBuy'
  | 'previouslyProducts'
  | 'basket'
  | 'oneClickOrder'
  | 'checkout'