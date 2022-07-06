import React from 'react';
import nextIcon from '../../Images/nextIcon.svg';
import style from './CheckoutPage.module.scss';
import { useFormik } from 'formik';
import navigationStyle from '../../styles/common/NavigationBlock.module.scss';
import formStyle from '../../styles/common/Form.module.scss';

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
      <div className={ navigationStyle.navigationBlock }>
        <div className={ navigationStyle.navigationBlockWrapper }>
          <p>Главная</p>
          <img src={ nextIcon } alt="nextIcon"/>
          <p>Корзина</p>
          <img src={ nextIcon } alt="nextIcon"/>
          <p>Оформление заказа</p>
        </div>
      </div>
      <div className={ style.checkoutBlock }>
        <h1>Оформление заказа</h1>
        <form className={ style.formBlock } onSubmit={ formik.handleSubmit }>
          <div className={ formStyle.formInfo }>
            <div className={ formStyle.formInput }>
              <p>Имя</p>
              <input
                type={ 'name' }
                placeholder={ 'Иванов Иван Иванович' }
                { ...formik.getFieldProps( 'name' ) }
              />
            </div>
            <div className={ formStyle.formInput }>
              <p>Номер телефона</p>
              <input
                type={ 'phoneNumber' }
                placeholder={ '+375 ___-__-__' }
                { ...formik.getFieldProps( 'phoneNumber' ) }
              />
            </div>
            <div className={style.list}>
              <div className={style.address}>Самовывоз по адресу: Минск, ул. Чюрлёниса, 6.
              <span></span>
              </div>
              <div>Оплата любым способом при получении
                <span></span>
              </div>
            </div>
            <div className={ style.basketInfo }>
              <p className={style.sum}>{ basketCount } BYN</p>
              <p className={style.productsInfo}>{ productsCount } товара</p>
            </div>
          </div>
          <div className={ style.orderBlock }>
            <button className={style.orderBtn} type="submit">Заказать</button>
            <p>Нажимая на кнопку вы даёте согласие на обработку <span onClick={ () => alert( 'Переход на pdf файл' ) }>персональных данных</span></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;