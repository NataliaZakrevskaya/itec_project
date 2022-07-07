import React from 'react';
import checkmarkCircle from '../../../../Images/checkmarkCircle.svg';
import Address from '../../Address/Address';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../../../routes/enums';
import style from './SuccessOrderModal.module.scss';
import scheduleStyle from '../../Schedule/Schedule.module.scss';
import grayClock from '../../../../Images/grayClock.svg';

const SuccessOrderModal = () => {
  const navigate = useNavigate();
  return (
    <div className={style.successModalContainer}>
      <img src={checkmarkCircle} alt="checkmarkCircle"/>
      <div className={style.title}>
      <h3>Заказ оформлен и ожидает вас по адресу:</h3>
      </div>
      <Address/>
      <div className={style.scheduleBlock}>
        <img src={ grayClock } alt={ 'timeIcon' }/>
        <p className={scheduleStyle.scheduleText}>Пон.-Пят. 10:00-21:00</p>
        <div className={style.headerStrip}></div>
        <p>Суб.-Вос. 10:00-20:00</p>
      </div>
      <button onClick={() => navigate(routesPathsEnum.ARTICLES)}>Читать полезные статьи</button>
    </div>
  );
};

export default SuccessOrderModal;