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
  personal_data_politics: string,
  info_main_page: {
    main_title: string,
    option_one: string,
    option_two: string,
  }
}