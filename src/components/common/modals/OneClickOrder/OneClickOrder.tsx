import React, { ReactElement, useState } from 'react';
import { useFormik } from 'formik';
import style from './OneClickOrder.module.scss';
import formStyle from '../../../../styles/common/Form.module.scss';
import { location } from '../../../../enums';
import { useDispatch, useSelector } from 'react-redux';
import { sendOneClickOrderTC } from '../../../../redux/reducers/onClickOrder';
import {
  getPriceWithDiscount,
  getPriceWithoutDiscount,
  getProductCount,
  getProductForOneClickOrder,
  getProductsArrayForOneClickOrder,
} from '../../../../redux/selectors/oneClickOrder';
import { AppDispatch } from '../../../../redux/store';
import { FormikErrorType, OnClickOrderPropsType } from '../types';
import { getAddress } from '../../../../redux/selectors/descriptionShop';
import PrivacyPolicyModal from '../PrivacyPolicyModal/PrivacyPolicyModal';
import { getDiscountsForBasket } from '../../../../redux/selectors/discountForBasket';
import ProductForOneClick from '../../ProductForOneClick/ProductForOneClick';

const OneClickOrder = ( { closeOneClickOrderModal }: OnClickOrderPropsType ): ReactElement => {

  const dispatch = useDispatch<AppDispatch>();
  const [ isPrivacyModalActive, setIsPrivacyModalActive ] = useState<boolean>( false );
  const productForOneClickOrder = useSelector( getProductForOneClickOrder );
  const productsInBasket = useSelector( getProductsArrayForOneClickOrder );
  const productsCount = useSelector( getProductCount );
  const basketCount = useSelector( getPriceWithoutDiscount );
  const basketCountWithDiscount = useSelector( getPriceWithDiscount );
  const discountForBasket = useSelector( getDiscountsForBasket );
  const address = useSelector( getAddress );
  const { chosen_option, max_discount } = productForOneClickOrder;
  const showDiscount = !!max_discount || !!chosen_option.discount_by_option;
  const orderInfo = { productsInBasket, productsCount, basketCount, basketCountWithDiscount };
  const closePrivacyModalContent = () => {
    setIsPrivacyModalActive( false );
  };
  const openPrivacyModalContent = () => {
    debugger
    setIsPrivacyModalActive( true );
  };

  const formik = useFormik( {
    initialValues: {
      name: '',
      phoneNumber: '',
    },
    validate: ( values ) => {
      const errors: FormikErrorType = {};
      if ( values.name.length < 2 ) {
        errors.name = 'Минимально допустимое количество символов: 2';
      } else if ( !/(^(?!~!"№;%\?.*\(\)#\$%\^&=\+-_@$)([A-Za-z]{1}[a-z]{1,18}( [A-Za-z]{1})?([a-z]{1,18})?)$)|(^[А-Яа-я]{1}[а-я]{1,18}( [А-Яа-я]{1})?([а-я]{1,18})?$)/i.test( values.name ) ) {
        errors.name = 'Допустимые символы: A-z А-я';
      } else if ( values.name.length > 30 ) {
        errors.name = 'Максимально допустимое количество символов: 30';
      }
      if ( !values.phoneNumber ) {
        errors.phoneNumber = 'Поле обязательно для заполнения';
      } else if ( values.phoneNumber.length !== 13 ) {
        errors.phoneNumber = 'Должно быть 13 символов';
      } else if ( !/([+]375(29|25|33|44)[0-9]{7})/i.test( values.phoneNumber ) ) {
        errors.phoneNumber = 'Введите, пожалуйста, номер в формате +375291234567';
      }
      return errors;
    },
    onSubmit: value => {
      formik.resetForm();
      dispatch( sendOneClickOrderTC( {
        name: value.name,
        phoneNumber: value.phoneNumber,
        orderInfo,
        discountForBasket,
      } ) );
      closeOneClickOrderModal();
    },
  } );

  return (
    <>
      { isPrivacyModalActive
        ? <PrivacyPolicyModal/>
        : ( <div className={ style.onClickOrderContent }>
          { showDiscount && <div className={ style.discount }>Акция</div> }
          <h3>Оформление заказа в 1 клик</h3>
          <ProductForOneClick
            isForModal={ true }
            closeOneClickModal={ closeOneClickOrderModal }
            from={ location.ONE_CLICK_ORDER }
          />
          <div className={ style.nextSection }>
            <span/>
          </div>
          <p className={ style.setDataParagraph }>Заполните данные и нажмите кнопку «Оформить заказ».<br/>Товар будет
            ждать
            вас
            по адресу: { address }</p>
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
                  placeholder={ '+375291231212' }
                  { ...formik.getFieldProps( 'phoneNumber' ) }
                />
                { formik.touched.phoneNumber && formik.errors.phoneNumber &&
                  <span>{ formik.errors.phoneNumber }</span>
                }
              </div>
            </div>
            <div className={ style.orderBlock }>
              <button type="submit">Оформить заказ</button>
            </div>
          </form>
          <p className={ style.personalData }>Нажимая на кнопку, вы даёте согласие на обработку
            <span onClick={ openPrivacyModalContent }> персональных данных </span></p>
        </div> ) }
    </>
  );
};

export default OneClickOrder;