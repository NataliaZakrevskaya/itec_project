import React, { useEffect, useRef, useState } from 'react';
import Address from '../common/Address/Address';
import Schedule from '../common/Schedule/Schedule';
import Phone from '../common/PhoneBlock/Phone';
import NavbarForHeader from '../Navbar/NavbarForHeader/NavbarForHeader';
import BasketLink from '../BasketLink/BasketLink';
import style from './Header.module.scss';
import SearchInput from '../SearchInput/SearchInput';
import commonStyle from '../../styles/common/Container.module.scss';
import HeaderLogo from '../Logo/headerLogo/HeaderLogo';
import Callback from '../common/Callback/Callback';
import instagramIcon from '../../Images/instagramIcon.svg';

const Header = ( { openEditMode, closeEditMode }: HeaderPropsType ) => {

  const [ width, setWidth ] = useState( 1200 );

  const windowElRef = useRef( null );

  useEffect( () => {
    const resizeHandler = () => {
      // @ts-ignore
      const _width = windowElRef?.current.offsetWidth;
      setWidth( _width );
    };
    resizeHandler();
    window.addEventListener( 'resize', resizeHandler );

    return () => {
      window.removeEventListener( 'resize', resizeHandler );
    };
  }, [ width ] );

  return (
    <header className={ style.header } ref={ windowElRef }>
      <div className={ `${ style.contactInfo } ${ commonStyle.container }` }>
        <Address/>
        <Schedule/>
        <div className={ style.instaPhoneNumber }>
          <div className={ style.phoneWrapper }>
            <Phone/>
            <a className={ style.headerInstagram } href={ 'https://www.instagram.com/' } target={ '_blank' }
               rel={ 'noreferrer' }>
              <img src={ instagramIcon } alt={ 'instagramIcon' }/>
            </a>
          </div>
          <Callback/>
        </div>
      </div>
      <div className={ style.navBarContainer }>
        <div className={ `${ style.navBar } ${ commonStyle.container } ` }>
          <HeaderLogo/>
          <div className={ style.navElements }>
            { width > 570
              ? <SearchInput forHeaderBurger={ false }/>
              : <div className={ style.searchIcon } onClick={openEditMode}/>
            }
            <NavbarForHeader forHeaderBurger={ false } closeEditMode={ closeEditMode }/>
            <BasketLink forHeaderBurger={ false } onClickHandler={ closeEditMode }/>
            <div onClick={ openEditMode } className={ style.burgerButton }/>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

type HeaderPropsType = {
  openEditMode: () => void
  closeEditMode: () => void
}