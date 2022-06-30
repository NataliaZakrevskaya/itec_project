import React from 'react';
import style from './CallbackModal.module.scss';
import { useFormik } from 'formik';

const CallbackModal = (  ) => {

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
        <form className={ style.formBlock } onSubmit={ formik.handleSubmit }>
          <h3>Перезвоним вам в течение 15 минут</h3>
          <div className={ style.formInfo }>
            <div className={ style.formInput }>
              <p>Имя</p>
              <input
                type={ 'name' }
                placeholder={ 'Иванов Иван Иванович' }
                { ...formik.getFieldProps( 'name' ) }
              />
            </div>
            <div className={ style.formInput }>
              <p>Номер телефона</p>
              <input
                type={ 'phoneNumber' }
                placeholder={ '+375 ___-__-__' }
                { ...formik.getFieldProps( 'phoneNumber' ) }
              />
            </div>
          </div>
          <div className={ style.orderBlock }>
            <button type="submit">Заказать</button>
            <p>Нажимая на кнопку вы даёте согласие на обработку</p>
            <p onClick={ () => alert( 'Переход на pdf файл' ) }>персональных данных</p>
          </div>
        </form>
  );
};

export default CallbackModal;
