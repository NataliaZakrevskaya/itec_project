export const getPrice = (price: number) => {
  if(price % 1 === 0) return Math.ceil(price)
  else return price
}