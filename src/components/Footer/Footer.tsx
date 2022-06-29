import React from 'react';
import style from './Footer.module.scss';
import commonStyle from '../../styles/common/Container.module.scss';
import FooterLogo from '../Logo/footerLogo/FooterLogo';
import NavbarForHeader from '../Navbar/NavbarForHeader/NavbarForHeader';
import Address from '../common/Address/Address';
import Phone from '../common/PhoneBlock/Phone';
import Schedule from '../common/Schedule/Schedule';
import Callback from '../common/Callback/Callback';
import NavbarForFooter from '../Navbar/NavbarForFooter/NavbarForFooter';

const Footer = () => {
  return (
    <div className={ style.footer }>
      <div className={ commonStyle.container }>
        <div className={ style.navbar }>
          <FooterLogo/>
          <NavbarForFooter/>
        </div>
        <hr/>
        <div className={ style.address }>
          <Address/>
          <Phone/>
          <Schedule/>
          <Callback/>
        </div>
        <div className={ style.siteInfo }>
          <div className={style.designerInfo}><p>Дизайн сайта: </p>
            <a href={ 'https://e.mail.ru/' } target={ '_blank' } rel={ 'noreferrer' }>shkuratovdesigner.com</a>
          </div>
          <p>© Все права защищены 2022</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;