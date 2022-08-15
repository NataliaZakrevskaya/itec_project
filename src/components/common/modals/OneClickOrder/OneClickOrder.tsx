import React from 'react';
import Product from '../../Product/Product';
import { useFormik } from 'formik';
import style from './OneClickOrder.module.scss';
import formStyle from '../../../../styles/common/Form.module.scss';
import { location } from '../../../../enums';
import { useDispatch, useSelector } from 'react-redux';
import { sendOneClickOrderTC } from '../../../../redux/reducers/onClickOrder-reducer';
import { getProductForOneClickOrder } from '../../../../redux/selectors/oneClickOrder-selectors';
import { AppDispatch } from '../../../../redux/store';
import { FormikErrorType, OnClickOrderPropsType } from '../types';
import { PRODUCT_IMAGE } from '../../../../constants';
import { getPriceWithDiscount } from '../../../../redux/reducers/helpers';

const OneClickOrder = ( { closeOneClickModal }: OnClickOrderPropsType ) => {

  const dispatch = useDispatch<AppDispatch>();
  const productForOneClickOrder = useSelector( getProductForOneClickOrder );
  const { id, options, name, images, chosen_option, max_discount } = productForOneClickOrder;
  const priceWithDiscount = getPriceWithDiscount( productForOneClickOrder );
  const showDiscount = !!max_discount || !!chosen_option.discount_by_option;

  const formik = useFormik( {
    initialValues: {
      name: '',
      phoneNumber: '',
    },
    validate: ( values ) => {
      const errors: FormikErrorType = {};
      if ( values.name.length < 2 ) {
        errors.name = 'Поле обязательно для заполнения';
      }
      if ( !values.phoneNumber ) {
        errors.phoneNumber = 'Поле обязательно для заполнения';
      } else if ( values.phoneNumber.length !== 13 ) {
        errors.phoneNumber = 'Должно быть 13 символов';
      } else if ( !/^[+]{1}375(29|25|33|44)[0-9]{7}$/i.test( values.phoneNumber ) ) {
        errors.phoneNumber = 'Введите, пожалуйста, номер в формате +375291234567';
      }
      return errors;
    },
    onSubmit: value => {
      formik.resetForm();
      dispatch( sendOneClickOrderTC( {
        name: value.name,
        phoneNumber: value.phoneNumber,
        orderInfo: [ {
          article_number: productForOneClickOrder.chosen_option.article_number,
          quantity: productForOneClickOrder.chosen_option.quantity,
        } ],
      } ) );
      closeOneClickModal();
    },
  } );

  return (
    <div className={ style.onClickOrderContent }>
      { showDiscount && <div className={ style.discount }>Акция</div> }
      <h3>Оформление заказа в 1 клик</h3>
      <Product
        id={ id }
        options={ options }
        name={ name }
        image={ images[ 0 ] ? images[ 0 ].image : `${ PRODUCT_IMAGE }` }
        chosenOption={ chosen_option }
        priceWithDiscount={ priceWithDiscount }
        isForModal={ true }
        from={ location.ONE_CLICK_ORDER }
      />
      <div className={ style.nextSection }>
        <span/>
      </div>
      <p className={ style.setDataParagraph }>Заполните данные и нажмите кнопку «Оформить заказ». Товар будет ждать вас
        по адресу: Минск, ул. Чюрлёниса,
        6.</p>
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
              placeholder={ '+375291231212' }
              { ...formik.getFieldProps( 'phoneNumber' ) }
            />
            { formik.touched.phoneNumber && formik.errors.phoneNumber &&
              <span>{ formik.errors.phoneNumber }</span>
            }
          </div>
        </div>
        <div className={ formStyle.orderBlock }>
          <button type="submit">Оформить заказ</button>
        </div>
      </form>
      <p className={ style.personalData }>Нажимая на кнопку вы даёте согласие на обработку
        <span onClick={ () => alert( 'Переход на pdf файл' ) }> персональных данных </span></p>
    </div>
  );
};

export default OneClickOrder;