export type ProductTypeInputPropsType = {
  id: number
  name: string,
  isActive: boolean,
  chooseProductType: ( id: number ) => void
}