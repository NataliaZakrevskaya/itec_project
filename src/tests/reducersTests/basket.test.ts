import { OptionType, ProductItemType } from '../../mocks';
import {
  basketReducer,
  changeChosenOption,
  decrementProductQuantity,
  incrementProductQuantity,
  removeByChosenOptionArticle,
  setProductToBasket,
} from '../../redux/reducers/basket-reducer';

let product: ProductItemType = {
  id: 1,
  name: 'Health Nutrition',
  options: [
    {
      id: 156,
      units: {
        id: 1,
        unit_name: 'шт.',
      },
      article_number: '405',
      discount_by_option: null,
      partial: false,
      quantity: 1,
      price: '2.00',
      size: 12,
      stock_balance: 2,
    },
    {
      id: 153,
      discount_by_option: null,
      units: {
        id: 1,
        unit_name: 'шт.',
      },
      article_number: '404',
      partial: false,
      quantity: 1,
      price: '20.00',
      size: 30,
      stock_balance: 12,
    },
  ],
  max_discount: null,
  discount_by_product: null,
  discount_by_category: null,
  chosen_option: {
    id: 156,
    discount_by_option: null,
    units: {
      id: 1,
      unit_name: 'шт.',
    },
    article_number: '405',
    partial: false,
    quantity: 1,
    price: '6.00',
    size: 12,
    stock_balance: 2,
  },
  images: [
    {
      id: 56,
      image: 'https://www.purinaone.ru/dog/sites/default/files/2021-11/shutterstock_1155759124_OG_1.jpg',
    },
    {
      id: 57,
      image: 'https://www.purinaone.ru/dog/sites/default/files/2021-11/shutterstock_1155759124_OG_1.jpg',
    },
  ],
};
let option: OptionType = {
  id: 153,
  units: {
    id: 1,
    unit_name: 'шт.',
  },
  article_number: '404',
  discount_by_option: null,
  partial: false,
  quantity: 1,
  price: '20.00',
  size: 30,
  stock_balance: 12,
};
let secondProduct: ProductItemType = {
  id: 2,
  name: 'Корм для собак',
  options: [
    {
      id: 156,
      article_number: '405',
      partial: false,
      quantity: 1,
      price: '2.00',
      size: 12,
      stock_balance: 2,
      discount_by_option: null,
      units: {
        id: 1,
        unit_name: 'шт.',
      },
    },
    {
      id: 15,
      discount_by_option: null,
      units: {
        id: 1,
        unit_name: 'шт.',
      },
      article_number: '404',
      partial: false,
      quantity: 1,
      price: '20.00',
      size: 30,
      stock_balance: 12,
    },
  ],
  max_discount: null,
  discount_by_product: null,
  discount_by_category: null,
  chosen_option: {
    id: 156,
    article_number: '405',
    partial: false,
    quantity: 1,
    price: '2.00',
    size: 12,
    stock_balance: 2,
    discount_by_option: null,
    units: {
      id: 1,
      unit_name: 'шт.',
    },
  },
  images: [
    {
      id: 56,
      image: 'https://www.purinaone.ru/dog/sites/default/files/2021-11/shutterstock_1155759124_OG_1.jpg',
    },
    {
      id: 57,
      image: 'https://www.purinaone.ru/dog/sites/default/files/2021-11/shutterstock_1155759124_OG_1.jpg',
    },
  ],
};
let startState: InitStateType;

beforeEach( () => {
  startState = {
    productsInBasket: [ product ],
    totalProductsCount: 0,
    totalSum: 0,
    totalSumWithDiscount: 0,
  };
} );

describe( 'operation with basket', () => {
  test( 'correct product should be added to basket\'s start with correct total sum and product quantity', () => {
    const endState = basketReducer( startState, setProductToBasket( { product: secondProduct } ) );
    expect( endState.productsInBasket.length ).toBe( 2 );
    expect( endState.productsInBasket[ 1 ].id ).toBe( 1 );
    expect( endState.productsInBasket[ 1 ].name ).toBe( 'Health Nutrition' );
    expect( endState.productsInBasket[ 0 ].id ).toBe( 2 );
    expect( endState.productsInBasket[ 0 ].name ).toBe( 'Корм для собак' );
    expect( endState.totalSum ).toBe( '8.00' );
    expect( endState.totalProductsCount ).toBe( 2 );
  } );
  test( 'correct option should be incremented with correct total sum', () => {
    const endState = basketReducer( startState, incrementProductQuantity( { optionId: 156, quantity: 1 } ) );
    expect( endState.productsInBasket[ 0 ].chosen_option.quantity ).toBe( 2 );
    expect( endState.totalSum ).toBe( '12.00' );
    expect( endState.totalProductsCount ).toBe( 2 );
  } );
  test( 'correct option should be decremented with correct total sum', () => {
    const endState = basketReducer( startState, decrementProductQuantity( { optionId: 156 } ) );
    expect( endState.productsInBasket[ 0 ].chosen_option.quantity ).toBe( 0 );
    expect( endState.totalSum ).toBe( '0.00' );
    expect( endState.totalProductsCount ).toBe( 0 );
  } );
  test( 'correct product should be deleted from basket with correct total sum and quantity', () => {
    const endState = basketReducer( startState, removeByChosenOptionArticle( { article_number: '405' } ) );
    expect( endState.productsInBasket.length ).toEqual( 0 );
    expect( endState.totalSum ).toBe( '0.00' );
    expect( endState.totalProductsCount ).toBe( 0 );
  } );
  test( 'correct option should be chosen', () => {
    const endState = basketReducer( startState, changeChosenOption( { productId: 1, option: option } ) );
    expect( endState.productsInBasket.length ).toBe( 1 );
    expect( endState.productsInBasket[ 0 ].chosen_option ).toEqual( option );
    expect( endState.totalSum ).toBe( '20.00' );
    expect( endState.totalProductsCount ).toBe( 1 );
  } );
} );

type InitStateType = {
  productsInBasket: Array<ProductItemType>,
  totalProductsCount: number,
  totalSum: number,
  totalSumWithDiscount: number,
}