import React from 'react';
import Product from '../../Product/Product';
import { OptionType } from '../../../../mocks';
import { useFormik } from 'formik';
import style from './OnClickOrder.module.scss';
import formStyle from '../../../../styles/common/Form.module.scss';
import { location } from '../../../../enums';
import { useDispatch, useSelector } from 'react-redux';
import { sendOneClickOrderTC } from '../../../../redux/reducers/onClickOrder-reducer';
import { getProductForOneClickOrder } from '../../../../redux/selectors/oneClickOrder-selectors';
import { AppDispatch } from '../../../../redux/store';

const OnClickOrder = ( { id, options, name, image, chosen_option }: OnClickOrderPropsType ) => {

  const dispatch = useDispatch<AppDispatch>();
  const productForOneClickOrder = useSelector(getProductForOneClickOrder)

  const formik = useFormik( {
    initialValues: {
      name: '',
      phoneNumber: '',
    },
    onSubmit: value => {
      formik.resetForm();
      dispatch(sendOneClickOrderTC({name: value.name, phoneNumber: value.phoneNumber, orderInfo: [{article_number: productForOneClickOrder.chosen_option.article_number, quantity: productForOneClickOrder.chosen_option.quantity}]}))
    },
  } );

  return (
    <div className={ style.onClickOrderContent }>
      <h3>Оформление заказа в 1 клик</h3>
      <Product
        id={ id }
        options={ options }
        name={ name }
        image={ image }
        chosenOption={ chosen_option }
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
      <p className={ style.personalData }>Нажимая на кнопку вы даёте согласие на обработку
        <span onClick={ () => alert( 'Переход на pdf файл' ) }> персональных данных </span></p>
    </div>
  );
};

export default OnClickOrder;

type OnClickOrderPropsType = {
  id: number,
  options: Array<OptionType>,
  name: string,
  image: string,
  chosen_option: OptionType
}