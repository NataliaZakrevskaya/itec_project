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
  animal: [
    {
      'id': 1,
      'name': 'Собаки',
      'image': 'http://127.0.0.1:8000/media/photos_animal/Y/M/image_10_4.png',
    },
  ],
  brand: {
    id: 1,
    name: 'Royal Canin',
    image: 'http://127.0.0.1:8000/media/photos_brand/Y/M/3-royal-canin-kitten_for_kittens_to_12_months.jpg',
  },
  category: {
    id: 1,
    name: 'Сухой Корм',
    is_active: true,
  },
  options: [
    {
      id: 156,
      units: {
        unit_name: 'шт.',
      },
      article_number: '405',
      discountproductoption: null,
      partial: false,
      quantity: 1,
      price: '2.00',
      size: 12,
      stock_balance: 2,
    },
    {
      id: 153,
      units: {
        unit_name: 'шт.',
      },
      article_number: '404',
      discountproductoption: null,
      partial: false,
      quantity: 1,
      price: '20.00',
      size: 30,
      stock_balance: 12,
    },
  ],
  discountproduct: null,
  chosen_option: {
    id: 156,
    units: {
      unit_name: 'шт.',
    },
    article_number: '405',
    discountproductoption: null,
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
  description: 'Полнорационный сухой корм для кастрированных котов и стерилизованных кошек от 1 до 7 лет. После стерилизации (кастрации) поведение кошек меняется, и их питание должно соответствовать новым специфическим потребностям. Дело в том, что эти кошки не отличаются высокой активностью, потребляют меньше жидкости и, соответственно, у них реже частота мочеиспусканий и повышена концентрация мочи.Контроль веса. После стерилизации у кошек уменьшаются энергетические потребности.',
  features: '\r\n\tSTERILISED 37 помогает снизить риск появления избыточного веса благодаря умеренному содержанию жиров, при соблюдении рекомендуемых норм кормления.\r\n\tПоддержание здоровья мочевыделительной системы. Помогает поддерживать здоровье мочевыделительной системы благодаря балансу минеральных веществ.\r\n\tПоддержание мышечной массы благодаря высокому содержанию белков. Способствует поддержанию мышечной массы благодаря высокому уровню белков.\r\n\tОбогащен L-карнитином. L-карнитин необходим для нормального обмена жиров.\r\n\r\n\r\nFELINE HEALTH NUTRITION &ndash; гамма продуктов повседневного питания для здоровых кошек, учитывающая их потребности обусловленные возрастом, образом жизни и другими индивидуальными особенностями.',
  composition: 'Дегидратированные белки животного происхождения (птица), изолят растительных белков*, пшеница, мука из зерновых культур, растительная клетчатка, животные жиры, гидролизат белков животного происхождения (вкусоароматические добавки), рис, минеральные вещества, рыбий жир, дрожжи и побочные продукты брожения, соевое масло, фруктоолигосахариды, хлорид аммония.',
  additives: 'Витамин A &ndash; 19 000 ME, витамин D3 &ndash; 1 000 ME, железо - 34 мг, йод &ndash; 3,4 мг, марганец - 44 мг, цинк &ndash; 131 мг, селен &ndash; 0,05 мг.\r\nТехнологические добавки: клиноптилолит осадочного происхождения &ndash; 10 гр, консерванты &ndash; антиокислители.\r\nРекомендации по кормлению: см. упаковку.\r\nСледите, чтобы у Вашего питомца всегда был доступ к чистой свежей воде.',
  analysis: '\r\n\tБелки &ndash; 37 %\r\n\tЖиры &ndash; 12 %\r\n\tКлетчатка &ndash; 6,2 %\r\n\tМинеральные вещества &ndash; 8,2 %\r\n\tБезазотистые экстрактивные вещества &ndash; 31,1 %\r\n',
};
let option: OptionType = {
  id: 153,
  units: {
    unit_name: 'шт.',
  },
  article_number: '404',
  discountproductoption: null,
  partial: false,
  quantity: 1,
  price: '20.00',
  size: 30,
  stock_balance: 12,
};
let secondProduct: ProductItemType = {
  id: 2,
  name: 'Корм для собак',
  animal: [
    {
      'id': 1,
      'name': 'Собаки',
      'image': 'http://127.0.0.1:8000/media/photos_animal/Y/M/image_10_4.png',
    },
  ],
  brand: {
    id: 1,
    name: 'Royal Canin',
    image: 'http://127.0.0.1:8000/media/photos_brand/Y/M/3-royal-canin-kitten_for_kittens_to_12_months.jpg',
  },
  category: {
    id: 1,
    name: 'Сухой Корм',
    is_active: true,
  },
  options: [
    {
      id: 15,
      units: {
        unit_name: 'шт.',
      },
      article_number: '405',
      discountproductoption: null,
      partial: false,
      quantity: 1,
      price: '2.00',
      size: 12,
      stock_balance: 2,
    },
    {
      id: 15,
      units: {
        unit_name: 'шт.',
      },
      article_number: '404',
      discountproductoption: null,
      partial: false,
      quantity: 1,
      price: '20.00',
      size: 30,
      stock_balance: 12,
    },
  ],
  discountproduct: null,
  chosen_option: {
    id: 156,
    units: {
      unit_name: 'шт.',
    },
    article_number: '405',
    discountproductoption: null,
    partial: false,
    quantity: 1,
    price: '2.00',
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
  description: 'Полнорационный сухой корм для кастрированных котов и стерилизованных кошек от 1 до 7 лет. После стерилизации (кастрации) поведение кошек меняется, и их питание должно соответствовать новым специфическим потребностям. Дело в том, что эти кошки не отличаются высокой активностью, потребляют меньше жидкости и, соответственно, у них реже частота мочеиспусканий и повышена концентрация мочи.Контроль веса. После стерилизации у кошек уменьшаются энергетические потребности.',
  features: '\r\n\tSTERILISED 37 помогает снизить риск появления избыточного веса благодаря умеренному содержанию жиров, при соблюдении рекомендуемых норм кормления.\r\n\tПоддержание здоровья мочевыделительной системы. Помогает поддерживать здоровье мочевыделительной системы благодаря балансу минеральных веществ.\r\n\tПоддержание мышечной массы благодаря высокому содержанию белков. Способствует поддержанию мышечной массы благодаря высокому уровню белков.\r\n\tОбогащен L-карнитином. L-карнитин необходим для нормального обмена жиров.\r\n\r\n\r\nFELINE HEALTH NUTRITION &ndash; гамма продуктов повседневного питания для здоровых кошек, учитывающая их потребности обусловленные возрастом, образом жизни и другими индивидуальными особенностями.',
  composition: 'Дегидратированные белки животного происхождения (птица), изолят растительных белков*, пшеница, мука из зерновых культур, растительная клетчатка, животные жиры, гидролизат белков животного происхождения (вкусоароматические добавки), рис, минеральные вещества, рыбий жир, дрожжи и побочные продукты брожения, соевое масло, фруктоолигосахариды, хлорид аммония.',
  additives: 'Витамин A &ndash; 19 000 ME, витамин D3 &ndash; 1 000 ME, железо - 34 мг, йод &ndash; 3,4 мг, марганец - 44 мг, цинк &ndash; 131 мг, селен &ndash; 0,05 мг.\r\nТехнологические добавки: клиноптилолит осадочного происхождения &ndash; 10 гр, консерванты &ndash; антиокислители.\r\nРекомендации по кормлению: см. упаковку.\r\nСледите, чтобы у Вашего питомца всегда был доступ к чистой свежей воде.',
  analysis: '\r\n\tБелки &ndash; 37 %\r\n\tЖиры &ndash; 12 %\r\n\tКлетчатка &ndash; 6,2 %\r\n\tМинеральные вещества &ndash; 8,2 %\r\n\tБезазотистые экстрактивные вещества &ndash; 31,1 %\r\n',
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