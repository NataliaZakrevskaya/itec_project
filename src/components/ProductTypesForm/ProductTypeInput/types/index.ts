export type ProductTypeInputPropsType = {
  id: number,
  name: string,
  discount: boolean,
  isActive: boolean,
  chooseProductType: ( id: number ) => void
}