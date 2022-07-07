import React from 'react';
import Product from '../../Product/Product';
import { getProductItems } from '../../../../mocks';
import { useFormik } from 'formik';
import style from './OnClickOrder.module.scss';
import formStyle from '../../../../styles/common/Form.module.scss';

const OnClickOrder = () => {

  const selectProduct = getProductItems()[ 0 ]; //todo заглушка, после получается из стора

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
    <div className={ style.onClickOrderContent }>
      <h3>Оформление заказа в 1 клик</h3>
      <Product
        unit={ selectProduct.unit }
        id={ selectProduct.id }
        options={ selectProduct.options }
        name={ selectProduct.name }
        image={ selectProduct.images[ 0 ].image }
        isForModal={ true }
      />
      <div className={style.nextSection}>
        <span></span>
      </div>
      <p className={style.setDataParagraph}>Заполните данные и нажмите кнопку «Оформить заказ». Товар будет ждать вас по адресу: Минск, ул. Чюрлёниса,
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
          <button type="submit">Оформить заказ</button>
        </div>
      </form>
      <p className={style.personalData}>Нажимая на кнопку вы даёте согласие на обработку
        <span onClick={ () => alert( 'Переход на pdf файл' ) }> персональных данных </span></p>
    </div>
  );
};

export default OnClickOrder;