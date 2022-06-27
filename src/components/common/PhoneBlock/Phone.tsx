import React from 'react';
import phoneIcon from '../../../Images/phoneIcon.svg';
import style from "./Phone.module.scss";

const Phone = () => {
  return (
    <div className={style.phoneBlock}>
      <img src={ phoneIcon } alt={ 'phoneIcon' }/>
      <p>+ 375 (44) 501 03 55</p>
    </div>
  );
};

export default Phone;