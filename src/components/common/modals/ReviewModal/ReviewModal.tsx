import React from 'react';
import { useFormik } from 'formik';
import style from './ReviewModal.module.scss';
import formStyle from '../../../../styles/common/Form.module.scss';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../redux/store';
import { sendReviewTC } from '../../../../redux/reducers/reviews-reducer';
import { FormikReviewErrorType, ReviewModalPropsType } from '../types';

const ReviewModal = ( { closeModal }: ReviewModalPropsType ) => {

  const dispatch = useDispatch<AppDispatch>();

  const formik = useFormik( {
    initialValues: {
      nameAuthor: '',
      phoneNumber: '',
      nameAnimal: '',
      bodyOfComment: '',
    },
    validate: ( values ) => {
      const errors: FormikReviewErrorType = {};
      if ( values.nameAuthor.length < 2 ) {
        errors.nameAuthor = 'Поле обязательно для заполнения';
      }
      if ( values.nameAnimal.length < 2 ) {
        errors.nameAnimal = 'Поле обязательно для заполнения';
      }
      if ( values.bodyOfComment.length < 2 ) {
        errors.bodyOfComment = 'Поле обязательно для заполнения';
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
      dispatch( sendReviewTC( {
        nameAuthor: value.nameAuthor,
        phoneNumber: value.phoneNumber,
        nameAnimal: value.nameAnimal,
        bodyOfComment: value.bodyOfComment,
      } ) );
      closeModal();
    },
  } );

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
            { formik.touched.nameAuthor && formik.errors.nameAuthor &&
              <span>{ formik.errors.nameAuthor }</span>
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
          <div className={ formStyle.formInput }>
            <p>Имя питомца</p>
            <input
              type={ 'nameAnimal' }
              placeholder={ 'Собака Шепард' }
              { ...formik.getFieldProps( 'nameAnimal' ) }
            />
            { formik.touched.nameAnimal && formik.errors.nameAnimal &&
              <span>{ formik.errors.nameAnimal }</span>
            }
          </div>
          <div className={ formStyle.formTextarea }>
            <p>Ваш отзыв</p>
            <textarea
              placeholder={ 'Введите текст...' }
              { ...formik.getFieldProps( 'bodyOfComment' ) }
            />
            { formik.touched.bodyOfComment && formik.errors.bodyOfComment &&
              <span>{ formik.errors.bodyOfComment }</span>
            }
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