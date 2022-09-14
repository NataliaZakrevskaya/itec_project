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
  getTotalSum,
  getTotalSumWithDiscount,
} from '../../redux/selectors/basket';
import { sendOrderTC } from '../../redux/reducers/basket';
import { AppDispatch } from '../../redux/store';
import { getOrderRequestStatus } from '../../redux/selectors/app';
import { RequestStatus } from '../../redux/reducers/enums';
import { setOrderRequestStatus } from '../../redux/reducers/app';
import { location } from '../../enums';
import { getPriceForBasket } from '../../helpers/getPrice';
import { getGoods } from '../../helpers/getGoods';
import { FormikErrorType } from '../../components/common/modals/types';
import PrivacyPolicyModal from '../../components/common/modals/PrivacyPolicyModal/PrivacyPolicyModal';
import { getDiscountsForBasket } from '../../redux/selectors/discountForBasket';

const CheckoutPage = React.memo( () => {

  const [ isSuccessModalActive, setIsSuccessModalActive ] = useState( false );
  const [ isPrivacyModalActive, setIsPrivacyModalActive ] = useState<boolean>( false );
  const orderIsSucceeded = useSelector( getOrderRequestStatus ) === RequestStatus.SUCCEEDED;
  const basketCountWithDiscount = useSelector( getTotalSumWithDiscount );
  const basketCount = useSelector( getTotalSum );
  const productsCount = useSelector( getTotalProductsCount );
  const productsInBasket = useSelector( getProductsInBasket );
  const priceWithDiscount = getPriceForBasket( basketCountWithDiscount );
  const discountForBasket = useSelector( getDiscountsForBasket );
  const price = getPriceForBasket( basketCount );
  const goodsName = getGoods( productsCount );
  const orderInfo = { productsInBasket, productsCount, basketCount, basketCountWithDiscount };

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const closeSuccessModal = () => {
    dispatch( setOrderRequestStatus( { status: RequestStatus.IDLE } ) );
    navigate( routesPathsEnum.ARTICLES );
    setIsSuccessModalActive( false );
  };
  const closePrivacyPolicyModal = () => {
    setIsPrivacyModalActive( false );
  };
  const openPrivacyPolicyModal = () => {
    setIsPrivacyModalActive( true );
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
      const errors: FormikErrorType = {};
      if ( values.name.length < 2 ) {
        errors.name = 'Минимально допустимое количество символов: 2';
      } else if (!/(^(?!~!"№;%\?.*\(\)#\$%\^&=\+-_@$)([A-Za-z]{1}[a-z]{1,18}( [A-Za-z]{1})?([a-z]{1,18})?)$)|(^[А-Яа-я]{1}[а-я]{1,18}( [А-Яа-я]{1})?([а-я]{1,18})?$)/i.test(values.name)){
        errors.name = 'Допустимые символы: A-z А-я';
      } else if (values.name.length > 30) {
        errors.name = 'Максимально допустимое количество символов: 30';
      }
      if ( !values.phoneNumber ) {
        errors.phoneNumber = 'Обязательно';
      } else if ( values.phoneNumber.length !== 13 ) {
        errors.phoneNumber = 'Должно быть 13 символов';
      } else if ( !/([+]375(29|25|33|44)[0-9]{7})/i.test( values.phoneNumber ) ) {
        errors.phoneNumber = 'Введите, пожалуйста, номер в формате +375291234567';
      }
      return errors;
    },
    onSubmit: value => {
      try {
        dispatch( sendOrderTC( { name: value.name, phoneNumber: value.phoneNumber, orderInfo, discountForBasket } ) );
        setIsSuccessModalActive( true );
        formik.resetForm();
      } catch ( e ) {
        console.error( e );
      }

    },
  } );
  return (
    <div className={ style.checkoutPage }>
      <div className={ navigationStyle.navigationBlock }>
        <div className={ navigationStyle.navigationBlockWrapper }>
          <p onClick={ () => navigate( routesPathsEnum.MAIN ) }>Главная</p>
          <img src={ nextIcon } loading={ 'lazy' } alt="nextIcon"/>
          <p onClick={ () => navigate( routesPathsEnum.BASKET ) }>Корзина</p>
          <img src={ nextIcon } loading={ 'lazy' } alt="nextIcon"/>
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
                placeholder={ 'Иванов Иван' }
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
              <p className={ priceWithDiscount !== price ? style.discountSum : style.sum }>{ price } BYN</p>
              { priceWithDiscount !== price && <p className={ style.sum }>{ priceWithDiscount } BYN</p> }
              <p className={ style.productsInfo }>{ productsCount } { goodsName }</p>
            </div>
          </div>
          <div className={ style.orderBlock }>
            <button className={ style.orderBtn } type="submit">Заказать</button>
            <p>Нажимая на кнопку, вы даёте согласие на обработку <span onClick={ openPrivacyPolicyModal }>персональных данных</span>
            </p>
          </div>
        </form>
      </div>
      { isSuccessModalActive && orderIsSucceeded &&
        <Modal closeModal={ closeSuccessModal }>
          <SuccessOrderModal from={ location.CHECKOUT }/>
        </Modal>
      }
      { isPrivacyModalActive &&
        <Modal closeModal={ closePrivacyPolicyModal }>
          <PrivacyPolicyModal closePrivacyPolicyModal={ closePrivacyPolicyModal }/>
        </Modal> }
    </div>
  );
} );

export default CheckoutPage;