import { AppRootStateType } from '../store';
import { ShopInfoType } from '../../types';

export const getAddress = ( state: AppRootStateType ): string => state.descriptionShop.address;
export const getPhoto = ( state: AppRootStateType ): string => state.descriptionShop.photo;
export const getDescriptionShop = ( state: AppRootStateType ): { title: string, main_info: string } => state.descriptionShop.description_shop;
export const getSecondInfo = ( state: AppRootStateType ): Array<{ id: number, info_title: string, info_text: string }> => state.descriptionShop.second_info;
export const getInfo = ( state: AppRootStateType ): ShopInfoType => state.descriptionShop;
export const getPrivacyPolicyText = ( state: AppRootStateType ): string => state.descriptionShop.personal_data_politics;
export const getMainInfo = ( state: AppRootStateType ): {  main_title: string, option_one: string, option_two: string, photo_main_page: string } => state.descriptionShop.info_main_page;
export const getBanners = ( state: AppRootStateType ): Array<{ title: string, color: string, image: string }> => state.descriptionShop.banners;
