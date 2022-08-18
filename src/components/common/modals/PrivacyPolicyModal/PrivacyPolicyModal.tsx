import React from 'react';
import style from './PrivacyPolicyModal.module.scss';
import { PrivacyPolicyModalPropsType } from '../types';
import { getPrivacyPolicyText } from '../../../../redux/selectors/descriptionShop-selectors';
import { useSelector } from 'react-redux';

const PrivacyPolicyModal = ({closePrivacyPolicyModal}: PrivacyPolicyModalPropsType) => {

  const privacyPolicyText = useSelector(getPrivacyPolicyText);
  const onBackClick = () => {
    closePrivacyPolicyModal()
  }
  return (
    <div className={style.modalContainer}>
      <h1>Политика конфиденциальности</h1>
      <p onClick={onBackClick} className={style.goBack}>Вернуться на сайт</p>
      <div dangerouslySetInnerHTML={{__html: privacyPolicyText}}/>
      <p onClick={onBackClick} className={style.goBackInTheEnd}>Вернуться на сайт</p>
    </div>
  );
};

export default PrivacyPolicyModal;