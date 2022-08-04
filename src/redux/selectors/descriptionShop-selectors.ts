import { AppRootStateType } from '../store';
import { ShopInfoType } from '../../mocks';

export const getAddress = (state: AppRootStateType): string => {
  return state.descriptionShop.address
}
export const getMetro = (state: AppRootStateType): string => {
  return state.descriptionShop.metro
}
export const getInfo = (state: AppRootStateType): ShopInfoType => {
  return state.descriptionShop
}