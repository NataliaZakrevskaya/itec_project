import React, { ReactElement } from 'react';
import checkmarkCircle from '../../../../Images/checkmarkCircle.svg';
import Address from '../../Address/Address';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../../../routes/enums';
import style from './SuccessOrderModal.module.scss';
import scheduleStyle from '../../Schedule/Schedule.module.scss';
import grayClock from '../../../../Images/grayClock.svg';
import { location } from '../../../../enums';
import { setOneClickOrderRequestStatus, setOrderRequestStatus } from '../../../../redux/reducers/app';
import { RequestStatus } from '../../../../redux/reducers/enums';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../redux/store';
import { getInfo } from '../../../../redux/selectors/descriptionShop';
import { SuccessOrderModalPropsType } from '../types';

const SuccessOrderModal = ( { from }: SuccessOrderModalPropsType ): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { metro, address, time_weekdays, time_weekend } = useSelector( getInfo );
  const onCloseButtonClick = () => {
    if ( from === location.ONE_CLICK_ORDER ) dispatch( setOneClickOrderRequestStatus( { status: RequestStatus.IDLE } ) );
    if ( from === location.CHECKOUT ) dispatch( setOrderRequestStatus( { status: RequestStatus.IDLE } ) );
    navigate( routesPathsEnum.ARTICLES );
  };

  return (
    <div className={ style.successModalContainer }>
      <img src={ checkmarkCircle } loading={'lazy'} alt="checkmarkCircle"/>
      <div className={ style.title }>
        <h3>Заказ поступил в обработку, ожидайте звонка консультанта</h3>
      </div>
      <Address address={ address } metro={ metro }/>
      <div className={ style.scheduleBlock }>
        <img src={ grayClock } loading={'lazy'} alt={ 'timeIcon' }/>
        <p className={ scheduleStyle.scheduleText }>Пн.-Пт. {time_weekdays}</p>
        <div className={ style.headerStrip }/>
        <p>Сб.-Вс. {time_weekend}</p>
      </div>
      <button onClick={ onCloseButtonClick }>Читать полезные статьи</button>
    </div>
  );
};

export default SuccessOrderModal;