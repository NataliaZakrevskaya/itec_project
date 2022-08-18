import React, { ReactElement } from 'react';
import phoneIcon from '../../../Images/phoneIcon.svg';
import style from './Phone.module.scss';
import { PhonePropsType } from '../types';

const Phone = React.memo(( { phoneNumber }: PhonePropsType ): ReactElement => {
  return (
    <div className={ style.phoneBlock }>
      <img src={ phoneIcon } loading={'lazy'} alt={ 'phoneIcon' }/>
      <a href="#">{ phoneNumber }</a>
    </div>
  );
});

export default Phone;