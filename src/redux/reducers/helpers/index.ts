/*this function is used to get the correct total number of products in the basket*/
import { DiscountType, OneProductItemType, ProductItemType } from '../../../types';

export const setTotalCount = ( state: any ) => {
  return state.totalProductsCount = state.productsInBasket.map( ( product: ProductItemType ) => {
    /*if the selected packing option is by weight, we consider it as one product, otherwise we calculate the number of selected packages*/
    if ( product.chosen_option.partial ) {
      return 1;
    } else {
      return product.chosen_option.quantity;
    }
  } )
    .reduce( ( acc: number, current: number ) => acc + current, 0 );
};
/*this function is used to calculate the correct basket total with all discountForBasket*/
export const setTotalSumWithDiscount = ( state: any, basketDiscount: DiscountType ) => {

  const arrayDiscountsForAllBasket = basketDiscount ? basketDiscount.options : null;

  const basketSumWithProductDiscounts = state.productsInBasket.map( ( product: ProductItemType | OneProductItemType ) => {
    /*if we have product discount and option discount*/
    if ( product.greatest_discount && product.chosen_option.discount_by_option ) {
      /*if the discount on the option is greater than the discount on the product*/
      if ( product.greatest_discount < product.chosen_option.discount_by_option ) {
        /*if packing - by weight*/
        if ( product.chosen_option.partial ) {
          /*return price with discount of option, taking into account that the cost for grams*/
          return ( +product.chosen_option.price - ( +product.chosen_option.price / 100 * product.chosen_option.discount_by_option ) ) * ( product.chosen_option.quantity / 1000 );
        }
        /*return price with discount of option*/
        else return ( +product.chosen_option.price - ( +product.chosen_option.price / 100 * product.chosen_option.discount_by_option ) ) * product.chosen_option.quantity;
      } else {
        if(product.chosen_option.partial){
          return ( +product.chosen_option.price - ( +product.chosen_option.price / 100 * product.greatest_discount ) ) * ( product.chosen_option.quantity / 1000 );
        }
        /*if the discount on the product is greater than discount on the option, return price with discount of product*/
        else return ( +product.chosen_option.price - ( +product.chosen_option.price / 100 * product.greatest_discount ) ) * product.chosen_option.quantity;
      }
    }
    /*if we have only product discount*/
    if ( product.greatest_discount && !product.chosen_option.discount_by_option ) {
      /*return price with discount of product*/
      if(product.chosen_option.partial){
        return ( +product.chosen_option.price - ( +product.chosen_option.price / 100 * product.greatest_discount ) ) * ( product.chosen_option.quantity / 1000 );
      }
      else return ( +product.chosen_option.price - ( +product.chosen_option.price / 100 * product.greatest_discount ) ) * product.chosen_option.quantity;
    }
    /*if we have only option discount*/
    if ( !product.greatest_discount && product.chosen_option.discount_by_option ) {
      /*if packing - by weight*/
      if ( product.chosen_option.partial ) {
        /*return price with discount of option, taking into account that the cost for grams*/
        return ( +product.chosen_option.price - ( +product.chosen_option.price / 100 * product.chosen_option.discount_by_option ) ) * ( product.chosen_option.quantity / 1000 );
        /*if packing isn't by weight, return price with discount of option*/
      }/*return price with discount of option*/
      else return ( +product.chosen_option.price - ( +product.chosen_option.price / 100 * product.chosen_option.discount_by_option ) ) * product.chosen_option.quantity;
    } else {
      /*if we don't have any discountForBasket, we return the full price*/
      /*if chosen option is partial, taking into account that the cost for grams*/
      if ( product.chosen_option.partial ) {
        return +product.chosen_option.price * ( product.chosen_option.quantity / 1000 );
      } /*if we don't have any discountForBasket, we return the full price*/
      else return +product.chosen_option.price * product.chosen_option.quantity;
    }
  } )
    .reduce( ( acc: number, current: number ) => acc + current, 0 ).toFixed( 2 );
  const basketSumWithoutDiscount = state.productsInBasket.map( ( product: ProductItemType | OneProductItemType ) => {
    if ( !product.greatest_discount && !product.chosen_option.discount_by_option ) { // @ts-ignore
      if ( product.chosen_option.partial ) {
        // @ts-ignore
        return product.chosen_option.price * (product.chosen_option.quantity / 1000)
      }
      else { // @ts-ignore
        return product.chosen_option.price * product.chosen_option.quantity;
      }
    } else return 0;
  } )
    .reduce( ( acc: number, current: number ) => acc + current, 0 ).toFixed( 2 );
  if ( !arrayDiscountsForAllBasket ) {
    return state.totalSumWithDiscount = basketSumWithProductDiscounts;
  } else {
    const discount = arrayDiscountsForAllBasket.find( option => option.min_price_for_discount <= basketSumWithoutDiscount )?.discount_amount; // undefined || option
    if ( !!discount ) {
      const totalDiscountForBasketWithountProductWithDiscount = basketSumWithoutDiscount / 100 * discount;
      return state.totalSumWithDiscount = ( basketSumWithProductDiscounts - totalDiscountForBasketWithountProductWithDiscount ).toFixed( 2 );
    } else return state.totalSumWithDiscount = basketSumWithProductDiscounts;
  }
};

/*this function is used to calculate the correct price of the product with all discountForBasket to display it on product card*/
export const getPriceWithDiscount = ( product: ProductItemType ) => {
  /*if we have product discount and option discount*/
  if ( product.greatest_discount && product.chosen_option.discount_by_option ) {
    /*if the discount on the option is greater than the discount on the product*/
    if ( product.greatest_discount < product.chosen_option.discount_by_option ) {
      /*if packing - by weight*/
      if ( product.chosen_option.partial ) {
        /*return price with discount of option, taking into account that the cost for grams*/
        return ( +product.chosen_option.price - ( +product.chosen_option.price / 100 * product.chosen_option.discount_by_option ) );
        /*if packing isn't by weight, return price with discount of option*/
      } else return ( +product.chosen_option.price - ( +product.chosen_option.price / 100 * product.chosen_option.discount_by_option ) ) * product.chosen_option.quantity;
    } else {
      if(product.chosen_option.partial){
        return ( +product.chosen_option.price - ( +product.chosen_option.price / 100 * product.greatest_discount ) ) ;
      }
      /*if the discount on the product is greater than discount on the option, return price with discount of product*/
      else return ( +product.chosen_option.price - ( +product.chosen_option.price / 100 * product.greatest_discount ) ) * product.chosen_option.quantity;
    }
  }
  /*if we have only product discount*/
  if ( product.greatest_discount && !product.chosen_option.discount_by_option ) {
    if(product.chosen_option.partial){
      return ( +product.chosen_option.price - ( +product.chosen_option.price / 100 * product.greatest_discount ) );
    }
    else return ( +product.chosen_option.price - ( +product.chosen_option.price / 100 * product.greatest_discount ) ) * product.chosen_option.quantity;
  }
  /*if we have only option discount*/
  if ( !product.greatest_discount && product.chosen_option.discount_by_option ) {
    /*if packing - by weight*/
    if ( product.chosen_option.partial ) {
      /*return price with discount of option, taking into account that the cost for grams*/
      return ( +product.chosen_option.price - ( +product.chosen_option.price / 100 * product.chosen_option.discount_by_option ) );
      /*if packing isn't by weight, return price with discount of option*/
    } else return ( +product.chosen_option.price - ( +product.chosen_option.price / 100 * product.chosen_option.discount_by_option ) ) * product.chosen_option.quantity;
  } else {
    /*if we don't have any discountForBasket, we return the full price*/
    /*if chosen option is partial, taking into account that the cost for grams*/
    if ( product.chosen_option.partial ) {
      return +product.chosen_option.price;
    }
    /*if we don't have any discountForBasket, we return the full price*/
    else return +product.chosen_option.price * product.chosen_option.quantity;
  }
};
/*this function is used to calculate the correct price of the product with all discountForBasket to display it on the product page*/
export const getPriceWithDiscountForProductPage = ( product: ProductItemType ) => {
  /*if we have product discount and option discount*/
  if ( product.greatest_discount && product.chosen_option.discount_by_option ) {
    /*if the discount on the option is greater than the discount on the product*/
    if ( product.greatest_discount < product.chosen_option.discount_by_option ) {
      /*if packing - by weight*/
      if ( product.chosen_option.partial ) {
        /*return price with discount of option, taking into account that the cost for grams*/
        return ( +product.chosen_option.price - ( +product.chosen_option.price / 100 * product.chosen_option.discount_by_option ) ) * ( product.chosen_option.quantity / 1000 );
        /*if packing isn't by weight, return price with discount of option*/
      } else return ( +product.chosen_option.price - ( +product.chosen_option.price / 100 * product.chosen_option.discount_by_option ) ) * product.chosen_option.quantity;
    } else {
      if(product.chosen_option.partial){
        return ( +product.chosen_option.price - ( +product.chosen_option.price / 100 * product.greatest_discount ) ) * ( product.chosen_option.quantity / 1000 );
      }
      /*if the discount on the product is greater than discount on the option, return price with discount of product*/
      else return ( +product.chosen_option.price - ( +product.chosen_option.price / 100 * product.greatest_discount ) ) * product.chosen_option.quantity;
    }
  }
  /*if we have only product discount*/
  if ( product.greatest_discount && !product.chosen_option.discount_by_option ) {
    if(product.chosen_option.partial){
      return ( +product.chosen_option.price - ( +product.chosen_option.price / 100 * product.greatest_discount ) ) * ( product.chosen_option.quantity / 1000 );
    }
    else return ( +product.chosen_option.price - ( +product.chosen_option.price / 100 * product.greatest_discount ) ) * product.chosen_option.quantity;
  }
  /*if we have only option discount*/
  if ( !product.greatest_discount && product.chosen_option.discount_by_option ) {
    /*if packing - by weight*/
    if ( product.chosen_option.partial ) {
      /*return price with discount of option, taking into account that the cost for grams*/
      return ( +product.chosen_option.price - ( +product.chosen_option.price / 100 * product.chosen_option.discount_by_option ) ) * ( product.chosen_option.quantity / 1000 );
      /*if packing isn't by weight, return price with discount of option*/
    } else return ( +product.chosen_option.price - ( +product.chosen_option.price / 100 * product.chosen_option.discount_by_option ) ) * product.chosen_option.quantity;
  } else {
    /*if we don't have any discountForBasket, we return the full price*/
    /*if chosen option is partial, taking into account that the cost for grams*/
    if ( product.chosen_option.partial ) {
      return +product.chosen_option.price * ( product.chosen_option.quantity / 1000 );
    }
    /*if we don't have any discountForBasket, we return the full price*/
    else return +product.chosen_option.price * product.chosen_option.quantity;
  }
};
/*this function is used to calculate the correct basket total count without any discountForBasket*/
export const setTotalSum = ( state: any ) => {
  return state.totalSum = state.productsInBasket.map( ( product: ProductItemType ) => {
    if ( product.chosen_option.partial ) {
      return +product.chosen_option.price * ( product.chosen_option.quantity / 1000 );
    } else return +product.chosen_option.price * product.chosen_option.quantity;
  } )
    .reduce( ( acc: number, current: number ) => acc + current, 0 ).toFixed( 2 );
};