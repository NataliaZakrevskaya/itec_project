export const getPrice = ( price: number ) => {
  if ( price % 1 === 0 ) return price;
  else return price.toFixed( 2 );
};