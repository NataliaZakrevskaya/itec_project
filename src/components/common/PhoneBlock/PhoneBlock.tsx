import React from 'react';
import phoneIcon from '../../../Images/phoneIcon.svg';
import style from "./phoneBlock.module.scss";

const PhoneBlock = () => {
  return (
    <div className={style.phoneBlock}>
      <img src={ phoneIcon } alt={ 'phoneIcon' }/>
      <p>+ 375 (44) 501 03 55</p>
    </div>
  );
};

export default PhoneBlock;