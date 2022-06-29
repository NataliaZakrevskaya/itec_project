import React from 'react';
import nextIcon from '../../Images/nextIcon.svg';
import style from './CheckoutPage.module.scss';
import { useFormik } from 'formik';

const CheckoutPage = () => {

  const basketCount = 543; // позже будет приходить из стора корзины
  const productsCount = 3; // позже будет приходить из стора корзины

  const formik = useFormik( {
    initialValues: {
      name: '',
      phoneNumber: '',
    },
    onSubmit: value => {
      formik.resetForm();
      alert( value );
      //dispatch( loginUserTC( { email: value.email, password: value.password, rememberMe: value.rememberMe } ) );
    },
  } );
  return (
    <div className={ style.checkoutPage }>
      <div className={ style.navigationBlock }>
        <p>Главная
          <img src={ nextIcon } alt="nextIcon"/>
          Корзина
          <img src={ nextIcon } alt="nextIcon"/>
          Оформление заказа
        </p>
      </div>
      <div className={ style.checkoutBlock }>
        <h1>Оформление заказа</h1>
        <form className={style.formBlock} onSubmit={ formik.handleSubmit }>
          <div className={style.formInfo}>
            <div className={style.formInput}>
              <p>Имя</p>
              <input
                type={ 'name' }
                placeholder={ 'Иванов Иван Иванович' }
                { ...formik.getFieldProps( 'name' ) }
              />
            </div>
            <div className={style.formInput}>
              <p>Номер телефона</p>
              <input
                type={ 'phoneNumber' }
                placeholder={ '+375 ___-__-__' }
                { ...formik.getFieldProps( 'phoneNumber' ) }
              />
            </div>
            <ul>
              <li>Самовывоз по адресу: Минск, ул. Чюрлёниса, 6.</li>
              <li>Оплата любым способом при получении</li>
            </ul>
            <div className={ style.basketInfo }>
              <p>{ basketCount } BYN</p>
              <p>{ productsCount } товара</p>
            </div>
          </div>
          <div className={style.orderBlock}>
            <button type="submit">Заказать</button>
            <p>Нажимая на кнопку вы даёте согласие на обработку</p>
            <p onClick={() => alert('Переход на pdf файл')}>персональных данных</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;