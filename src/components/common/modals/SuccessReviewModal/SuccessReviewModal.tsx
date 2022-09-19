import React, { ReactElement } from 'react';
import checkmarkCircle from '../../../../Images/checkmarkCircle.svg';
import buttonStyle from '../../../../styles/common/SmallButton.module.scss';
import style from './SuccessReviewModal.module.scss';
import { ReviewModalPropsType } from '../types';

const SuccessReviewModal = ( { closeModal }: ReviewModalPropsType ): ReactElement => {
  return (
    <div className={ style.successReviewModal }>
      <img src={ checkmarkCircle } loading={'lazy'} alt="checkmarkCircle" draggable="false"/>
      <h3>Мы получили ваш отзыв</h3>
      <button className={ buttonStyle.smallButton } onClick={ closeModal }>Продолжить покупки</button>
    </div>
  );
};

export default SuccessReviewModal;

