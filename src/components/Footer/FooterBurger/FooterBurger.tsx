import React from 'react';
import Address from '../../common/Address/Address';
import Phone from '../../common/PhoneBlock/Phone';
import Schedule from '../../common/Schedule/Schedule';
import Callback from '../../common/Callback/Callback';
import style from './FooterBurger.module.scss';

const FooterBurger = () => {
  return (
    <div className={style.footerBurger}>
      <Address/>
      <div className={style.instaBlock}>
      <Phone/>
      <div className={style.instagramIcon}/>
      </div>
      <Schedule forFooterBurger={true}/>
      <Callback/>
      </div>
  );
};

export default FooterBurger;