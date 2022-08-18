import React, { ReactElement, useEffect } from 'react';
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
import { useResize } from '../../customHooks/useResize';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { fetchDescriptionShopTC } from '../../redux/reducers/descriptionShop';
import { getInfo } from '../../redux/selectors/descriptionShop';

const Header = ( { openEditMode, closeEditMode }: HeaderPropsType ): ReactElement => {

  const { metro, address, phone_number, social, time_weekdays, time_weekend } = useSelector( getInfo );
  const dispatch = useDispatch<AppDispatch>();
  const { width, windowElRef } = useResize();

  useEffect( () => {
    if ( !metro || !address || !phone_number || !social || !time_weekdays || !time_weekend ) dispatch( fetchDescriptionShopTC() );
  }, [ address, metro, phone_number, social, time_weekdays, time_weekend, dispatch ] );

  return (
    <header className={ style.header } ref={ windowElRef }>
      <div className={ `${ style.contactInfo } ${ commonStyle.container }` }>
        <Address address={ address } metro={ metro }/>
        <Schedule timeWeekdays={ time_weekdays } timeWeekend={ time_weekend }/>
        <div className={ style.instaPhoneNumber }>
          <div className={ style.phoneWrapper }>
            <Phone phoneNumber={ phone_number }/>
            <a className={ style.headerInstagram } href={ social } target={ '_blank' }
               rel={ 'noreferrer' }>
              <img src={ instagramIcon } loading={'lazy'} alt={ 'instagramIcon' }/>
            </a>
          </div>
          <Callback forHeader={ true }/>
        </div>
      </div>
      <div className={ style.navBarContainer }>
        <div className={ `${ style.navBar } ${ commonStyle.container } ` }>
          <HeaderLogo/>
          { width > 768 && <SearchInput forHeaderBurger={ false }/> }
          <div className={ style.navElements }>
            { width < 769 && <div className={ style.searchIcon } onClick={ openEditMode }/> }
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