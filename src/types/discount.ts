export type DiscountType = {
  title: string,
  options: [
    {
      min_price_for_discount: number,
      discount_amount: number
    },
    {
      min_price_for_discount: number,
      discount_amount: number
    }
  ],
  is_active: boolean
}