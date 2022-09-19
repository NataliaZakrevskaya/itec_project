import React, { ReactElement } from 'react';
import timeIcon from '../../../Images/clock_minorfooter.svg';
import style from './Schedule.module.scss';
import { SchedulePropsType } from '../types';

const Schedule = React.memo(( { forFooterBurger, timeWeekdays, timeWeekend }: SchedulePropsType ): ReactElement => {
  return (
    <div className={ style.scheduleBlock }>
      <div className={ style.scheduleBlockWrapperOne }>
        { !forFooterBurger && <img src={ timeIcon } loading={'lazy'} alt={ 'timeIcon' } draggable="false"/> }
        <p>Пн.-Пт. { timeWeekdays }</p>
      </div>
      <div className={ style.scheduleBlockWrappers }>
        <div className={ style.headerStrip }/>
        <p>Сб.-Вс. { timeWeekend }</p>
      </div>
    </div>
  );
});

export default Schedule;

