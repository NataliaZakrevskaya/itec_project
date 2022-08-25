import React, { ReactElement } from 'react';
import style from './Footer.module.scss';
import commonStyle from '../../styles/common/Container.module.scss';
import FooterLogo from '../Logo/footerLogo/FooterLogo';
import Address from '../common/Address/Address';
import Phone from '../common/PhoneBlock/Phone';
import Schedule from '../common/Schedule/Schedule';
import NavbarForFooter from '../Navbar/NavbarForFooter/NavbarForFooter';
import Callback from '../common/Callback/Callback';
import { useSelector } from 'react-redux';
import { getInfo } from '../../redux/selectors/descriptionShop';

const Footer = (): ReactElement => {

  const { address, metro, time_weekdays, time_weekend, phone_number } = useSelector( getInfo );

  return (
    <footer className={ style.footer }>
      <div className={ commonStyle.container }>
        <div className={ style.navbar }>
          <FooterLogo/>
          <NavbarForFooter/>
        </div>
        <hr/>
        <div className={ style.address }>
          <Address address={ address } metro={ metro }/>
          <Phone phoneNumber={ phone_number }/>
          <Schedule timeWeekend={ time_weekend } timeWeekdays={ time_weekdays }/>
          <Callback forHeader={ false }/>
          <hr className={ style.hr }/>
        </div>
        <div className={ style.siteInfo }>
          <div className={ style.designerInfo }><p>Дизайн сайта: </p>
            <a href={ 'https://e.mail.ru/' } target={ '_blank' } rel={ 'noreferrer' }>shkuratovdesigner.com</a>
          </div>
          <p>© Все права защищены 2022</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;