import { OneProductItemType, OptionType, ProductItemType } from '../../../mocks';

export type SectionButtonPropsType = {
  disabled: boolean,
  onClick: () => void
}
export type PhonePropsType = {
  phoneNumber: string
}
export type ProductForBasketPropsType = {
  product: ProductItemType | OneProductItemType,
  isForModal: boolean,
  from: string
}
export type ProductForBasketModalPropsType = {
  id: number,
  name: string,
  countOfProduct: number,
  chosenOption: OptionType,
  image: string,
  priceWithDiscount?: number
}
export type SchedulePropsType = {
  forFooterBurger?: boolean,
  timeWeekdays: string,
  timeWeekend: string
}
export type SmallerButtonPropsType = {
  title: string
  onClick: () => void
}
export type ThemeBlockWrapperPropsType = {
  title: string,
  onButtonClick: () => void,
  itemsForBlock: Array<ProductItemType>,
  blockTheme: any,
  from: string,
  withoutButton?: boolean
}
export type UnitsForBasketPropsType = {
  option: OptionType,
  active: boolean,
  onUnitClick: ( option: OptionType ) => void,
}