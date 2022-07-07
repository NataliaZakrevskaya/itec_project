import React from 'react';
import timeIcon from '../../../Images/timeIcon.svg';
import style from './Schedule.module.scss';

const Schedule = () => {
  return (
    <div className={style.scheduleBlock}>
        <div className={style.scheduleBlockWrapperOne}>
            <img src={ timeIcon } alt={ 'timeIcon' }/>
            <p className={style.scheduleText}>Пон.-Пят. 10:00-21:00</p>
        </div>
        <div className={style.scheduleBlockWrappers}>
            <div className={style.headerStrip}></div>
            <p>Суб.-Вос. 10:00-20:00</p>
        </div>
    </div>
  );
};

export default Schedule;