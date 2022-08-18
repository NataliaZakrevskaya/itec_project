import { AppRootStateType } from '../store';
import { ShopInfoType } from '../../types';

export const getAddress = (state: AppRootStateType): string => {
  return state.descriptionShop.address
}
export const getPhoto = (state: AppRootStateType): string => {
  return state.descriptionShop.photo
}
export const getDescriptionShop = (state: AppRootStateType): { title: string, main_info: string } => {
  return state.descriptionShop.description_shop
}
export const getSecondInfo = (state: AppRootStateType): Array<{ id: number, info_title: string, info_text: string }> => {
  return state.descriptionShop.second_info
}
export const getInfo = (state: AppRootStateType): ShopInfoType => {
  return state.descriptionShop
}
export const getPrivacyPolicyText = (state: AppRootStateType): string => {
  return state.descriptionShop.personal_data_politics
}