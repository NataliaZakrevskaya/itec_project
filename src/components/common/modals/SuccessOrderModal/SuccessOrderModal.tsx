import React from 'react';
import checkmarkCircle from '../../../../Images/checkmarkCircle.svg';
import Address from '../../Address/Address';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../../../routes/enums';
import style from './SuccessOrderModal.module.scss';
import scheduleStyle from '../../Schedule/Schedule.module.scss';
import grayClock from '../../../../Images/grayClock.svg';
import { location, LocationsType } from '../../../../enums';
import { setOneClickOrderRequestStatus, setOrderRequestStatus } from '../../../../redux/reducers/app-reducer';
import { RequestStatus } from '../../../../redux/reducers/enums';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../redux/store';

const SuccessOrderModal = ( { from }: SuccessOrderModalPropsType ) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const onCloseButtonClick = () => {
    if (from === location.ONE_CLICK_ORDER) dispatch( setOneClickOrderRequestStatus( { status: RequestStatus.IDLE } ))
    if (from === location.CHECKOUT) dispatch(setOrderRequestStatus({status: RequestStatus.IDLE}))
      navigate( routesPathsEnum.ARTICLES )
  }

  return (
    <div className={ style.successModalContainer }>
      <img src={ checkmarkCircle } alt="checkmarkCircle"/>
      <div className={ style.title }>
        <h3>Заказ оформлен и ожидает вас по адресу:</h3>
      </div>
      <Address/>
      <div className={ style.scheduleBlock }>
        <img src={ grayClock } alt={ 'timeIcon' }/>
        <p className={ scheduleStyle.scheduleText }>Пон.-Пят. 10:00-21:00</p>
        <div className={ style.headerStrip }/>
        <p>Суб.-Вос. 10:00-20:00</p>
      </div>
      <button onClick={ onCloseButtonClick }>Читать полезные статьи</button>
    </div>
  );
};

export default SuccessOrderModal;

type SuccessOrderModalPropsType = {
  from: LocationsType
}