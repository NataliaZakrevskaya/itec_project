import React from 'react';
import timeIcon from '../../../Images/clock_minorfooter.svg';
import style from './Schedule.module.scss';

const Schedule = ( { forFooterBurger, timeWeekdays, timeWeekend }: SchedulePropsType ) => {
  return (
    <div className={ style.scheduleBlock }>
      <div className={ style.scheduleBlockWrapperOne }>
        { !forFooterBurger && <img src={ timeIcon } alt={ 'timeIcon' }/> }
        <p className={ style.scheduleText }>Пон.-Пят. {timeWeekdays}</p>
      </div>
      <div className={ style.scheduleBlockWrappers }>
        <div className={ style.headerStrip }/>
        <p>Суб.-Вос. {timeWeekend}</p>
      </div>
    </div>
  );
};

export default Schedule;

type SchedulePropsType = {
  forFooterBurger? : boolean,
  timeWeekdays: string,
  timeWeekend: string
}