import React from 'react';
import checkmarkCircle from '../../../../Images/checkmarkCircle.svg';
import style from './SuccessCallbackModals.module.scss';
import buttonStyle from '../../../../styles/common/SmallButton.module.scss';

const SuccessCallbackModals = ({closeModal}: SuccessCallbackModalsPropsType) => {
  return (
    <div className={style.successCallbackModalsContent}>
      <img src={checkmarkCircle} alt="checkmarkCircle"/>
      <h3>Мы получили вашу заявку</h3>
      <p>Ожидайте звонка в течение 15 минут</p>
      <button className={buttonStyle.smallButton} onClick={closeModal}>Понятно, жду</button>
    </div>
  );
};

export default SuccessCallbackModals;

type SuccessCallbackModalsPropsType = {
  closeModal: () => void
}
