import { OptionType, ProductItemType } from '../../../types';

export type ProductItemPropsType = {
  product: ProductItemType,
  id: number,
  image: string,
  name: string,
  options: Array<OptionType>,
  classNameForDarkItem?: string,
  chosenOption: OptionType,
  openOneClickModal: ( product: ProductItemType ) => void,
  openBasketModal: ( product: ProductItemType ) => void,
  from: string,
  forCatalog: boolean
}