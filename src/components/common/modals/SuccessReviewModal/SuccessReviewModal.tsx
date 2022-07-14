import React from 'react';
import checkmarkCircle from '../../../../Images/checkmarkCircle.svg';
import buttonStyle from '../../../../styles/common/SmallButton.module.scss';
import style from './SuccessReviewModal.module.scss';

const SuccessReviewModal = ({closeModal}: SuccessReviewModalType) => {
  return (
    <div className={style.successReviewModal}>
      <img src={checkmarkCircle} alt="checkmarkCircle"/>
      <h3>Мы получили ваш отзыв</h3>
      <button className={buttonStyle.smallButton} onClick={closeModal}>Продолжить покупки</button>
    </div>
  );
};

export default SuccessReviewModal;

type SuccessReviewModalType = {
  closeModal: () => void
}