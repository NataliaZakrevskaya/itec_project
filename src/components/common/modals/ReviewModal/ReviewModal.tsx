import React from 'react';
import { useFormik } from 'formik';
import style from './ReviewModal.module.scss';
import formStyle from '../../../../styles/common/Form.module.scss';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../redux/store';
import { sendReviewTC } from '../../../../redux/reducers/reviews-reducer';

const ReviewModal = ( { closeModal }: ReviewModalType ) => {

  const dispatch = useDispatch<AppDispatch>();

  const formik = useFormik( {
    initialValues: {
      nameAuthor: '',
      phoneNumber: '',
      nameAnimal: '',
      bodyOfComment: '',
    },
    onSubmit: value => {
      formik.resetForm();
      dispatch( sendReviewTC( {
        nameAuthor: value.nameAuthor,
        phoneNumber: value.phoneNumber,
        nameAnimal: value.nameAnimal,
        bodyOfComment: value.bodyOfComment,
      } ) );
      closeModal();
    },
  } )

  return (
    <div className={ style.reviewModal }>
      <h3>Ваш отзыв</h3>
      <form className={ style.formBlock } onSubmit={ formik.handleSubmit }>
        <div className={ formStyle.formInfo }>
          <div className={ formStyle.formInput }>
            <p>Имя</p>
            <input
              type={ 'nameAuthor' }
              placeholder={ 'Иванов Иван Иванович' }
              { ...formik.getFieldProps( 'nameAuthor' ) }
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
          <div className={ formStyle.formInput }>
            <p>Имя питомца</p>
            <input
              type={ 'nameAnimal' }
              placeholder={ 'Собака Шепард' }
              { ...formik.getFieldProps( 'nameAnimal' ) }
            />
          </div>
          <div className={ formStyle.formTextarea }>
            <p>Ваш отзыв</p>
            <textarea
              placeholder={ 'Введите текст...' }
              { ...formik.getFieldProps( 'bodyOfComment' ) }
            />
          </div>
        </div>
        <div className={ formStyle.orderBlock }>
          <button type="submit">Отправить отзыв</button>
        </div>
      </form>
    </div>
  );
};

export default ReviewModal;

type ReviewModalType = {
  closeModal: () => void
}