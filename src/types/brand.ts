export type BrandType = {
  id: number,
  name: string,
  image: string,
  chosen: boolean
}
export type ResBrandType = {
  id: number,
  name: string,
  image: string,
}
export type SubcategoryType = {
  id: number,
  name: string,
  discount_subcategory: null
}
export type ResProductType = {
  id: number,
  name: string,
  subcategory: SubcategoryType[],
}