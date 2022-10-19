import { SubcategoryType } from '../../../../types';

export type ProductTypeInputPropsType = {
  id: number,
  name: string,
  subcategory: SubcategoryType[],
  isActive: boolean,
  chooseProductType: ( id: number ) => void
}