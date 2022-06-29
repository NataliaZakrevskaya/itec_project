import React from 'react';
import style from './ContactBlock.module.scss';
import commonStyle from '../../styles/common/Container.module.scss';
import map from '../../Images/map.svg';
import Address from '../common/Address/Address';
import Schedule from '../common/Schedule/Schedule';
import Phone from '../common/PhoneBlock/Phone';
import instagramIcon from '../../Images/instagramIcon.svg';

const ContactBlock = () => {
  return (
    <div className={ style.contactBlockContainer }>
      <div className={commonStyle.container}>
        <div className={style.contactBlock}>
          <div>
            <img src={map} alt="map"/> {/*//todo заглушка карты*/}
          </div>
          <div>
            <h3>Бесплатно проконсультируем по любому вопросу связанному с вашим любимцем</h3>
            <Address />
            <p>Время работы</p>
            <Schedule />
            <p>Телефон</p>
            <Phone />
            <p>Пишите нам в социальных сетях</p>
            <a href={ 'https://www.instagram.com/' } target={ '_blank' } rel={ 'noreferrer' }>
              <img src={ instagramIcon } alt={ 'instagramIcon' }/>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactBlock;