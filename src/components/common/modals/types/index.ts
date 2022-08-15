import { OneProductItemType, ProductItemType } from '../../../../mocks';
import { LocationsType } from '../../../../enums';

export type BasketModalPropsType = {
  product: ProductItemType | OneProductItemType,
  countOfProduct?: number,
  closeModal: () => void,
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