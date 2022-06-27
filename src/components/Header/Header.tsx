import React from 'react';
import Address from '../common/Address/Address';
import Schedule from '../common/Schedule/Schedule';
import Phone from '../common/PhoneBlock/Phone';
import instagramIcon from '../../Images/instagramIcon.svg';
import Navbar from '../Navbar/Navbar';
import BasketLink from '../BasketLink/BasketLink';
import style from './Header.module.scss';
import SearchInput from '../SearchInput/SearchInput';
import commonStyle from '../../styles/common/Container.module.scss';
import HeaderLogo from '../Logo/headerLogo/HeaderLogo';
import Callback from '../common/Callback/Callback';

const Header = () => {

  return (
    <header className={ style.header }>
      <div className={ `${ style.contactInfo } ${ commonStyle.container }` }>
        <Address/>
        <Schedule/>
        <div className={ style.instaPhoneNumber }>
          <Phone/>
          <a href={ 'https://www.instagram.com/' } target={ '_blank' } rel={ 'noreferrer' }>
            <img src={ instagramIcon } alt={ 'instagramIcon' }/>
          </a>
        </div>
        <Callback/>
      </div>
      <div className={ style.navBarContainer }>
        <div className={ `${ style.navBar } ${ commonStyle.container } ` }>
          <HeaderLogo/>
          <SearchInput/>
          <Navbar/>
          <BasketLink/>
        </div>
      </div>
    </header>
  );
};

export default Header;