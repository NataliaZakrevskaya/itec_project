import React from 'react';
import style from './ContactBlock.module.scss';
import commonStyle from '../../styles/common/Container.module.scss';
import Address from '../common/Address/Address';
import Schedule from '../common/Schedule/Schedule';
import Phone from '../common/PhoneBlock/Phone';
import instagramIcon from '../../Images/instagramIcon.svg';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

const ContactBlock = () => {
  return (
    <div className={ style.contactBlockContainer }>
      <div className={commonStyle.container}>
        <div className={style.contactBlock}>
          <div className={style.contactBlockImageWrapper}>
            <YMaps>
              <Map defaultState={{ center: [53.854422, 27.478944], zoom: 15 }} className={style.map} >
                <Placemark geometry={[53.854422, 27.478944]} />
              </Map>
            </YMaps>
          </div>
          <div className={style.contactBlockWrapper}>
            <h3 className={style.contactBlockWrapperTitle}>Бесплатно проконсультируем по любому вопросу связанному с вашим любимцем</h3>
            <div className={style.contactBlockWrapperDirection}>
              <Address />
            </div>
            <div className={style.contactBlockWrapperTimeWork}>
              <p className={style.timeWork}>Время работы</p>
              <Schedule />
            </div>
            <div className={style.contactBlockWrapperTel}>
              <p className={style.tel}>Телефон</p>
              <Phone />
            </div>
            <div className={style.contactBlockWrapperSocial}>
              <p className={style.socialTitle}>Пишите нам в социальных сетях</p>
              <a href={ 'https://www.instagram.com/' } target={ '_blank' } rel={ 'noreferrer' }>
                <img src={ instagramIcon } alt={ 'instagramIcon' }/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactBlock;