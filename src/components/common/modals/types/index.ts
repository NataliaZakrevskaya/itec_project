import { OptionType } from '../../../../mocks';
import { LocationsType } from '../../../../enums';

export type BasketModalPropsType = {
  name: string,
  image: string,
  id: number,
  chosenOption: OptionType,
  countOfProduct?: number,
  closeModal: () => void,
  priceWithDiscount?: number
}
export type ModalPropsType = {
  closeModal: () => void
  children: any
}
export type FormikErrorType = {
  name?: string,
  phoneNumber?: string
}
export type OnClickOrderPropsType = {
  id: number,
  options: Array<OptionType>,
  name: string,
  image: string,
  chosen_option: OptionType,
  closeOneClickModal: () => void
}
export type RejectSearchResultPropsType = {
  requestTitle: string
  onClick: () => void
}
export type ReviewModalPropsType = {
  closeModal: () => void
}
export type FormikReviewErrorType = {
  nameAuthor?: string,
  phoneNumber?: string,
  nameAnimal?: string,
  bodyOfComment?: string
}
export type SuccessCallbackModalsPropsType = {
  closeModal: () => void
}
export type SuccessOrderModalPropsType = {
  from: LocationsType
}