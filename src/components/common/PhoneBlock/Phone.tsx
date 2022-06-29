import React from 'react';
import phoneIcon from '../../../Images/phoneIcon.svg';
import style from "./Phone.module.scss";

const Phone = () => {
  return (
    <div className={style.phoneBlock}>
      <img src={ phoneIcon } alt={ 'phoneIcon' }/>
      <a href='#'>+ 375 (44) 501 03 55</a>
    </div>
  );
};

export default Phone;