import React, { useEffect, useState } from 'react';
import nextIcon from '../../Images/nextIcon.svg';
import style from './CheckoutPage.module.scss';
import { useFormik } from 'formik';
import navigationStyle from '../../styles/common/NavigationBlock.module.scss';
import formStyle from '../../styles/common/Form.module.scss';
import Modal from '../../components/common/modals/Modal';
import SuccessOrderModal from '../../components/common/modals/SuccessOrderModal/SuccessOrderModal';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../routes/enums';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProductsInBasket,
  getTotalProductsCount,
  getTotalSumWithDiscount,
} from '../../redux/selectors/basket-selectors';
import { sendOrderTC } from '../../redux/reducers/basket-reducer';
import { AppDispatch } from '../../redux/store';
import { getOrderRequestStatus } from '../../redux/selectors/app-selectors';
import { RequestStatus } from '../../redux/reducers/enums';
import { setOrderRequestStatus } from '../../redux/reducers/app-reducer';
import { location } from '../../enums';
import { getPrice } from '../../helpers/getPrice';
import { getGoods } from '../../helpers/getGoods';

const CheckoutPage = () => {

  const orderIsSucceeded = useSelector( getOrderRequestStatus ) === RequestStatus.SUCCEEDED;
  const [ isSuccessModalActive, setIsSuccessModalActive ] = useState( false );
  const basketCount = useSelector( getTotalSumWithDiscount );
  const price = getPrice( basketCount );
  const productsCount = useSelector( getTotalProductsCount );
  const goodsName = getGoods( productsCount );
  const productsInBasket = useSelector( getProductsInBasket );
  const orderInfo = productsInBasket.map( product => {
    return ( { article_number: product.chosen_option.article_number, quantity: product.chosen_option.quantity } );
  } );

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const closeSuccessModal = () => {
    dispatch( setOrderRequestStatus( { status: RequestStatus.IDLE } ) );
    navigate( routesPathsEnum.ARTICLES );
    setIsSuccessModalActive( false );
  };
  const openSuccessModal = () => {
    setIsSuccessModalActive( true );
  };
  useEffect( () => {
    if ( isSuccessModalActive && orderIsSucceeded ) {
      window.document.body.style.overflow = 'hidden';
    }
    return () => {
      window.document.body.style.overflow = '';
    };
  }, [ isSuccessModalActive, orderIsSucceeded ] );

  const formik = useFormik( {
    initialValues: {
      name: '',
      phoneNumber: '',
    },
    validate: ( values ) => {
      const errors: FormikOrderErrorType = {};
      if ( values.name.length < 2 ) {
        errors.name = 'Поле обязательно для заполнения';
      }
      if ( !values.phoneNumber ) {
        errors.phoneNumber = 'Обязательно';
      } else if ( values.phoneNumber.length !== 13 ) {
        errors.phoneNumber = 'Должно быть 13 символов';
      } else if ( !/^[+]{1}375(29|25|33|44)[0-9]{7}$/i.test( values.phoneNumber ) ) {
        errors.phoneNumber = 'Введите, пожалуйста, номер в формате +375291234567';
      }
      return errors;
    },
    onSubmit: value => {
      formik.resetForm();
      dispatch( sendOrderTC( { name: value.name, phoneNumber: value.phoneNumber, orderInfo: orderInfo } ) );
    },
  } );
  return (
    <div className={ style.checkoutPage }>
      <div className={ navigationStyle.navigationBlock }>
        <div className={ navigationStyle.navigationBlockWrapper }>
          <p onClick={ () => navigate( routesPathsEnum.MAIN ) }>Главная</p>
          <img src={ nextIcon } alt="nextIcon"/>
          <p onClick={ () => navigate( routesPathsEnum.BASKET ) }>Корзина</p>
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
              { formik.touched.name && formik.errors.name &&
                <span>{ formik.errors.name }</span>
              }
            </div>
            <div className={ formStyle.formInput }>
              <p>Номер телефона</p>
              <input
                type={ 'phoneNumber' }
                placeholder={ '+375291234567' }
                { ...formik.getFieldProps( 'phoneNumber' ) }
              />
              { formik.touched.phoneNumber && formik.errors.phoneNumber &&
                <span>{ formik.errors.phoneNumber }</span>
              }
            </div>
            <div className={ style.list }>
              <div className={ style.address }>Самовывоз по адресу: Минск, ул. Чюрлёниса, 6.
                <span/>
              </div>
              <div>Оплата любым способом при получении
                <span/>
              </div>
            </div>
            <div className={ style.basketInfo }>
              <p className={ style.sum }>{ price } BYN</p>
              <p className={ style.productsInfo }>{ productsCount } { goodsName }</p>
            </div>
          </div>
          <div className={ style.orderBlock }>
            <button className={ style.orderBtn } type="submit" onClick={ openSuccessModal }>Заказать</button>
            <p>Нажимая на кнопку вы даёте согласие на обработку <span onClick={ () => alert( 'Переход на pdf файл' ) }>персональных данных</span>
            </p>
          </div>
        </form>
      </div>
      { isSuccessModalActive && orderIsSucceeded &&
        <Modal closeModal={ closeSuccessModal }>
          <SuccessOrderModal from={ location.CHECKOUT }/>
        </Modal>
      }
    </div>
  );
};

export default CheckoutPage;

type FormikOrderErrorType = {
  name?: string,
  phoneNumber?: string
}