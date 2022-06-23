import React from 'react';
import timeIcon from '../../../Images/timeIcon.svg';
import style from './Schedule.module.scss';

const Schedule = () => {
  return (
    <div className={style.scheduleBlock}>
      <img src={ timeIcon } alt={ 'timeIcon' }/>
      <p className={style.scheduleText}>Пон.-Пят. 10:00-21:00</p>
      <p>Суб.-Вос. 10:00-20:00</p>
    </div>
  );
};

export default Schedule;