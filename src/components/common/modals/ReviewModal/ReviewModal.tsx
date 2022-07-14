import React from 'react';
import { useFormik } from 'formik';
import style from './ReviewModal.module.scss';
import formStyle from '../../../../styles/common/Form.module.scss';

const ReviewModal = ( { closeModal }: ReviewModalType ) => {

  const formik = useFormik( {
    initialValues: {
      name_author: '',
      phone_number: '',
      name_animal: '',
      body_of_comment: '',
    },
    onSubmit: value => {
      formik.resetForm();
      alert( value );
    },
  } );

  const onButtonClick = () => {
    alert( 'диспатч санки ' );
    closeModal();
  };
  return (
    <div className={ style.reviewModal }>
      <h3>Ваш отзыв</h3>
      <form className={ style.formBlock } onSubmit={ formik.handleSubmit }>
        <div className={ formStyle.formInfo }>
          <div className={ formStyle.formInput }>
            <p>Имя</p>
            <input
              type={ 'name_author' }
              placeholder={ 'Иванов Иван Иванович' }
              { ...formik.getFieldProps( 'name_author' ) }
            />
          </div>
          <div className={ formStyle.formInput }>
            <p>Номер телефона</p>
            <input
              type={ 'phone_number' }
              placeholder={ '+375 ___-__-__' }
              { ...formik.getFieldProps( 'phone_number' ) }
            />
          </div>
          <div className={ formStyle.formInput }>
            <p>Имя питомца</p>
            <input
              type={ 'name_animal' }
              placeholder={ 'Собака Шепард' }
              { ...formik.getFieldProps( 'name_animal' ) }
            />
          </div>
          <div className={ formStyle.formTextarea }>
            <p>Ваш отзыв</p>
            <textarea
              placeholder={ 'Введите текст...' }
              { ...formik.getFieldProps( 'body_of_comment' ) }
            />
          </div>
        </div>
        <div className={ formStyle.orderBlock }>
          <button onClick={ onButtonClick } type="submit">Отправить отзыв</button>
        </div>
      </form>
    </div>
  );
};

export default ReviewModal;

type ReviewModalType = {
  closeModal: () => void
}