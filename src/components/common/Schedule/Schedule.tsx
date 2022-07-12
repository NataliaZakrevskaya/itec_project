import React from 'react';
import timeIcon from '../../../Images/timeIcon.svg';
import style from './Schedule.module.scss';

const Schedule = ( { forFooterBurger }: any ) => {
  return (
    <div className={ style.scheduleBlock }>
      <div className={ style.scheduleBlockWrapperOne }>
        { !forFooterBurger && <img src={ timeIcon } alt={ 'timeIcon' }/> }
        <p className={ style.scheduleText }>Пон.-Пят. 10:00-21:00</p>
      </div>
      <div className={ style.scheduleBlockWrappers }>
        <div className={ style.headerStrip }/>
        <p>Суб.-Вос. 10:00-20:00</p>
      </div>
    </div>
  );
};

export default Schedule;