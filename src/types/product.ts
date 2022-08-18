export type OptionType = {
  id: number,
  discount_by_option: number | null,
  article_number: string,
  units: {id: number, unit_name: string },
  quantity: number,
  partial: boolean,
  price: string,
  size: number,
  stock_balance: number,
}
export type ProductItemType = {
  id: number,
  max_discount: number | null,
  discount_by_product: number | null,
  discount_by_category: number | null,
  name: string,
  options: Array<OptionType>,
  chosen_option: OptionType,
  images: Array<{ id: number, image: string }>,
}
export type OneProductItemType = {
  id: number,
  max_discount: number | null,
  discount_by_product: number | null,
  discount_by_category: number | null,
  brand: { id: number, name: string, image: string },
  name: string,
  options: Array<OptionType>,
  chosen_option: OptionType,
  images: Array<{ id: number, image: string }>,
  description: string,
  features: string,
  composition: string,
  additives: string,
  analysis: string,
}
export type responseProductItemType = {
  page_number: number,
  products_on_page: number,
  total_products: number,
  total_pages: number,
  max_products_on_page: number,
  results: Array<ProductItemType>
}