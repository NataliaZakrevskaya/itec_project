import React from 'react';
import style from './CallbackModal.module.scss';
import formStyle from '../../../../styles/common/Form.module.scss';
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
          </div>
          <div className={ formStyle.orderBlock }>
            <button onClick={() => alert('диспатч санки')} type="submit">Отправить</button>
            <p>Нажимая на кнопку вы даёте согласие на обработку
            <span onClick={ () => alert( 'Переход на pdf файл' ) }> персональных данных</span></p>
          </div>
        </form>
  );
};

export default CallbackModal;
