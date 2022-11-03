import { ProductItemType } from '../types';

export const GetPartialProductForOrdering = ( productItem: ProductItemType ) => productItem.chosen_option.partial ? {
  ...productItem,
  chosen_option: { ...productItem.chosen_option, quantity: 1000 },
} : productItem;