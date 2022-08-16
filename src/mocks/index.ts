import { AxiosRequestConfig, AxiosResponseHeaders } from 'axios';

export const getProductItems = (): Array<ProductItemType> => {
  return [
    {
      id: 1,
      max_discount: null,
      discount_by_product: null,
      discount_by_category: null,
      name: 'Health Nutrition',
      options: [
        {
          id: 156,
          discount_by_option: null,
          units: {
            id: 1,
            unit_name: 'шт.',
          },
          article_number: '405',
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
    },
    {
      id: 2,
      max_discount: null,
      discount_by_product: null,
      discount_by_category: null,
      name: 'Health Nutrition',
      options: [
        {
          id: 156,
          discount_by_option: null,
          units: {
            id: 1,
            unit_name: 'шт.',
          },
          article_number: '405',
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
    },
    {
      id: 3,
      max_discount: null,
      discount_by_product: null,
      discount_by_category: null,
      name: 'Health Nutrition',
      options: [
        {
          id: 156,
          discount_by_option: null,
          units: {
            id: 1,
            unit_name: 'шт.',
          },
          article_number: '405',
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
    },
    {
      id: 4,
      max_discount: null,
      discount_by_product: null,
      discount_by_category: null,
      name: 'Health Nutrition',
      options: [
        {
          id: 156,
          discount_by_option: null,
          units: {
            id: 1,
            unit_name: 'шт.',
          },
          article_number: '405',
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
    },
    {
      id: 5,
      max_discount: null,
      discount_by_product: null,
      discount_by_category: null,
      name: 'Health Nutrition',
      options: [
        {
          id: 156,
          discount_by_option: null,
          units: {
            id: 1,
            unit_name: 'шт.',
          },
          article_number: '405',
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
    },
    {
      id: 6,
      max_discount: null,
      discount_by_product: null,
      discount_by_category: null,
      name: 'Health Nutrition',
      options: [
        {
          id: 156,
          discount_by_option: null,
          units: {
            id: 1,
            unit_name: 'шт.',
          },
          article_number: '405',
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
    },
    {
      id: 7,
      max_discount: null,
      discount_by_product: null,
      discount_by_category: null,
      name: 'Health Nutrition',
      options: [
        {
          id: 156,
          discount_by_option: null,
          units: {
            id: 1,
            unit_name: 'шт.',
          },
          article_number: '405',
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
    },
    {
      id: 8,
      max_discount: null,
      discount_by_product: null,
      discount_by_category: null,
      name: 'Health Nutrition',
      options: [
        {
          id: 156,
          discount_by_option: null,
          units: {
            id: 1,
            unit_name: 'шт.',
          },
          article_number: '405',
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
    },
    {
      id: 9,
      max_discount: null,
      discount_by_product: null,
      discount_by_category: null,
      name: 'Health Nutrition',
      options: [
        {
          id: 156,
          discount_by_option: null,
          units: {
            id: 1,
            unit_name: 'шт.',
          },
          article_number: '405',
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
    },
    {
      id: 10,
      max_discount: null,
      discount_by_product: null,
      discount_by_category: null,
      name: 'Health Nutrition',
      options: [
        {
          id: 156,
          discount_by_option: null,
          units: {
            id: 1,
            unit_name: 'шт.',
          },
          article_number: '405',
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
    },
    {
      id: 11,
      max_discount: null,
      discount_by_product: null,
      discount_by_category: null,
      name: 'Health Nutrition',
      options: [
        {
          id: 156,
          discount_by_option: null,
          units: {
            id: 1,
            unit_name: 'шт.',
          },
          article_number: '405',
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
    },
    {
      id: 12,
      max_discount: null,
      discount_by_product: null,
      discount_by_category: null,
      name: 'Health Nutrition',
      options: [
        {
          id: 156,
          discount_by_option: null,
          units: {
            id: 1,
            unit_name: 'шт.',
          },
          article_number: '405',
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
    },
  ];
};
export const getWithThisProductsBuy = (): Array<ProductItemType> => {
  return [
    {
      id: 1,
      max_discount: null,
      discount_by_product: null,
      discount_by_category: null,
      name: 'Health Nutrition',
      options: [
        {
          id: 156,
          discount_by_option: null,
          units: {
            id: 1,
            unit_name: 'шт.',
          },
          article_number: '405',
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
    },
    {
      id: 2,
      max_discount: null,
      discount_by_product: null,
      discount_by_category: null,
      name: 'Health Nutrition',
      options: [
        {
          id: 156,
          discount_by_option: null,
          units: {
            id: 1,
            unit_name: 'шт.',
          },
          article_number: '405',
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
    },
    {
      id: 3,
      max_discount: null,
      discount_by_product: null,
      discount_by_category: null,
      name: 'Health Nutrition',
      options: [
        {
          id: 156,
          discount_by_option: null,
          units: {
            id: 1,
            unit_name: 'шт.',
          },
          article_number: '405',
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
    },
    {
      id: 4,
      max_discount: null,
      discount_by_product: null,
      discount_by_category: null,
      name: 'Health Nutrition',
      options: [
        {
          id: 156,
          discount_by_option: null,
          units: {
            id: 1,
            unit_name: 'шт.',
          },
          article_number: '405',
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
    },
    {
      id: 5,
      max_discount: null,
      discount_by_product: null,
      discount_by_category: null,
      name: 'Health Nutrition',
      options: [
        {
          id: 156,
          discount_by_option: null,
          units: {
            id: 1,
            unit_name: 'шт.',
          },
          article_number: '405',
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
    },
    {
      id: 6,
      max_discount: null,
      discount_by_product: null,
      discount_by_category: null,
      name: 'Health Nutrition',
      options: [
        {
          id: 156,
          discount_by_option: null,
          units: {
            id: 1,
            unit_name: 'шт.',
          },
          article_number: '405',
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
    },
    {
      id: 7,
      max_discount: null,
      discount_by_product: null,
      discount_by_category: null,
      name: 'Health Nutrition',
      options: [
        {
          id: 156,
          discount_by_option: null,
          units: {
            id: 1,
            unit_name: 'шт.',
          },
          article_number: '405',
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
    },
    {
      id: 8,
      max_discount: null,
      discount_by_product: null,
      discount_by_category: null,
      name: 'Health Nutrition',
      options: [
        {
          id: 156,
          discount_by_option: null,
          units: {
            id: 1,
            unit_name: 'шт.',
          },
          article_number: '405',
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
    },
    {
      id: 9,
      max_discount: null,
      discount_by_product: null,
      discount_by_category: null,
      name: 'Health Nutrition',
      options: [
        {
          id: 156,
          discount_by_option: null,
          units: {
            id: 1,
            unit_name: 'шт.',
          },
          article_number: '405',
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
    },
    {
      id: 10,
      max_discount: null,
      discount_by_product: null,
      discount_by_category: null,
      name: 'Health Nutrition',
      options: [
        {
          id: 156,
          discount_by_option: null,
          units: {
            id: 1,
            unit_name: 'шт.',
          },
          article_number: '405',
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
    },
    {
      id: 11,
      max_discount: null,
      discount_by_product: null,
      discount_by_category: null,
      name: 'Health Nutrition',
      options: [
        {
          id: 156,
          discount_by_option: null,
          units: {
            id: 1,
            unit_name: 'шт.',
          },
          article_number: '405',
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
    },
    {
      id: 12,
      max_discount: null,
      discount_by_product: null,
      discount_by_category: null,
      name: 'Health Nutrition',
      options: [
        {
          id: 156,
          discount_by_option: null,
          units: {
            id: 1,
            unit_name: 'шт.',
          },
          article_number: '405',
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
    },
  ];
};
export const getDiscounts = (): Array<any> => {
  return [
    {
      id: 0,
      title: 'Скидка 25% на первый заказ любого товара на сумму от 50BYN',
      img: 'https://res.cloudinary.com/dk-find-out/image/upload/q_80,w_1920,f_auto/580540_mjznrj.jpg',
    },
    {
      id: 1,
      title: 'Получите игрушку в подарок при сумме заказа от 200BYN',
      img: 'https://res.cloudinary.com/dk-find-out/image/upload/q_80,w_1920,f_auto/580540_mjznrj.jpg',
    },
  ];
};
export const getProductInitState = (): OneProductItemType => {
  return {
    id: 0,
    max_discount: null,
    discount_by_product: null,
    discount_by_category: null,
    name: '',
    brand: { id: 0, name: "", image: "" },
    options: [ {
      id: 0,
      discount_by_option: null,
      article_number: '',
      units: { id: 0, unit_name: '' },
      quantity: 0,
      partial: false,
      price: '',
      size: 0,
      stock_balance: 0,
    } ],
    chosen_option: {
      id: 0,
      discount_by_option: null,
      article_number: '',
      units: { id: 0, unit_name: '' },
      quantity: 0,
      partial: false,
      price: '',
      size: 0,
      stock_balance: 0,
    },
    images: [ { id: 0, image: '' } ],
    description: '',
    features: '',
    composition: '',
    additives: '',
    analysis: '',
  };
};

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
export type ArticleType = {
  id: number,
  title: string,
  description: string,
  time_read: number,
  date_added: string,
  image: string,
  is_active: boolean,
  animals: number
}
export type ReviewsType = {
  id: number,
  name_author: string,
  body_of_comment: string,
  phone_number: string,
  name_animal: string,
}
export type AnimalTypesType = {
  id: number,
  name: string,
  image: string,
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
export type AxiosResponse<T = any, D = any> = {
  data: T,
  status: number;
  statusText: string;
  headers: AxiosResponseHeaders;
  config: AxiosRequestConfig<D>;
  request?: any;
}
export type resProductTypesType = {
  id: number,
  name: string,
  is_active: boolean
}
export type ShopInfoType = {
  id: number,
  address: string,
  metro: string,
  time_weekdays: string,
  time_weekend: string,
  phone_number: string,
  social: string,
  maps: string,
  photo: string,
  description_shop: {
    title: string,
    main_info: string
  },
  second_info: Array<{
    id: number,
    info_title: string,
    info_text: string
  }>
}
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

