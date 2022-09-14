import React, { ReactElement } from 'react';
import { useFormik } from 'formik';
import style from './ReviewModal.module.scss';
import formStyle from '../../../../styles/common/Form.module.scss';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../redux/store';
import { sendReviewTC } from '../../../../redux/reducers/reviews';
import { FormikReviewErrorType, ReviewModalPropsType } from '../types';

const ReviewModal = ( { closeModal }: ReviewModalPropsType ): ReactElement => {

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
        errors.nameAuthor = 'Минимально допустимое количество символов: 2';
      } else if (!/(^(?!~!"№;%\?.*\(\)#\$%\^&=\+-_@$)([A-Za-z]{1}[a-z]{1,18}( [A-Za-z]{1})?([a-z]{1,18})?)$)|(^[А-Яа-я]{1}[а-я]{1,18}( [А-Яа-я]{1})?([а-я]{1,18})?$)/i.test(values.nameAuthor)){
        errors.nameAuthor = 'Допустимые символы: A-z А-я';
      } else if (values.nameAuthor.length > 30) {
        errors.nameAuthor = 'Максимально допустимое количество символов: 30';
      }
      if ( values.nameAnimal.length < 2 ) {
        errors.nameAnimal = 'Минимально допустимое количество символов: 2';
      } else if (!/(^(?!~!"№;%\?.*\(\)#\$%\^&=\+-_@$)([A-Za-z]{1}[a-z]{1,18}( [A-Za-z]{1})?([a-z]{1,18})?)$)|(^[А-Яа-я]{1}[а-я]{1,18}( [А-Яа-я]{1})?([а-я]{1,18})?$)/i.test(values.nameAuthor)){
        errors.nameAnimal = 'Допустимые символы: A-z А-я';
      } else if (values.nameAuthor.length > 30) {
        errors.nameAnimal = 'Максимально допустимое количество символов: 30';
      }
      if ( values.bodyOfComment.length < 2 ) {
        errors.bodyOfComment = 'Минимально допустимое количество символов: 2';
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
              placeholder={ 'Иванов Иван' }
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