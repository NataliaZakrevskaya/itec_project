import React from 'react';
import phoneIcon from '../../../Images/phoneIcon.svg';
import style from './Phone.module.scss';

const Phone = ( { phoneNumber }: PhonePropsType ) => {
  return (
    <div className={ style.phoneBlock }>
      <img src={ phoneIcon } alt={ 'phoneIcon' }/>
      <a href="#">{ phoneNumber }</a>
    </div>
  );
};

export default Phone;

type PhonePropsType = {
  phoneNumber: string
}