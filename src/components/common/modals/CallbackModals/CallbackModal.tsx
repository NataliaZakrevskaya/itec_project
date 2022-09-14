import React, { ReactElement } from 'react';
import style from './CallbackModal.module.scss';
import formStyle from '../../../../styles/common/Form.module.scss';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../redux/store';
import { sendCallbackRequestTC } from '../../../../redux/reducers/basket';
import { CallbackModalPropsType, FormikErrorType } from '../types';

const CallbackModal = ({openPrivacyPolicyModal}: CallbackModalPropsType): ReactElement => {

  const dispatch = useDispatch<AppDispatch>();

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
      dispatch( sendCallbackRequestTC( { name: value.name, phoneNumber: value.phoneNumber } ) );
    },
  } );

  return (
    <form className={ style.formBlock } onSubmit={ formik.handleSubmit }>
      <h3>Перезвоним вам в течение 15 минут</h3>
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
      <div className={ formStyle.orderBlock }>
        <button type="submit">Отправить</button>
        <p>Нажимая на кнопку, вы даёте согласие на обработку
          <span onClick={ openPrivacyPolicyModal }> персональных данных</span></p>
      </div>
    </form>
  );
};

export default CallbackModal;
