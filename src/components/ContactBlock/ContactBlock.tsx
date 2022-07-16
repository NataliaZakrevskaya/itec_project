import React from 'react';
import style from './ContactBlock.module.scss';
import commonStyle from '../../styles/common/Container.module.scss';
import Phone from '../common/PhoneBlock/Phone';
import instagramIcon from '../../Images/instagramIcon.svg';
import { Map, Placemark, YMaps } from 'react-yandex-maps';
import metroIcon from '../../Images/metroIcon.svg';
import navigationIcon from '../../Images/navigateIcon.svg';
import timeIcon from '../../Images/timeIcon.svg';

const ContactBlock = () => {
  return (
    <div className={ style.contactBlockContainer }>
      <div className={ commonStyle.container }>
        <div className={ style.contactBlock }>
          <div className={ style.contactBlockMapWrapper }>
            <YMaps>
              <Map defaultState={ { center: [ 53.854422, 27.478944 ], zoom: 15 } } className={ style.map }>
                <Placemark geometry={ [ 53.854422, 27.478944 ] } className={ style.mapTwo }/>
              </Map>
            </YMaps>
          </div>
          <div className={ style.contactBlockWrapper }>
            <h3 className={ style.contactBlockWrapperTitle }>Бесплатно проконсультируем по любому вопросу связанному с
              вашим любимцем</h3>
            <div className={ style.contactBlockWrapperDirection }>
              <div className={ style.contactBlockAdressSWrapper }>
                <img src={ navigationIcon } alt=""/>
                <p>Минск, ул. Чюрлёниса, 6.</p>
              </div>
              <div className={ style.contactBlockWrapperMetro }>
                <img src={ metroIcon } alt=""/>
                <p>Малиновка</p>
              </div>
            </div>
            <div className={ style.contactBlockWrapperTimeWork }>
              <p className={ style.timeWork }>Время работы</p>
              <div className={ style.scheduleWrapper }>
                <div className={ style.scheduleWrapperFirst }>
                  <img src={ timeIcon } alt="timeIcon"/>
                  <div>Пон.-Пят. 10:00-21:00</div>
                </div>
                <div className={ style.scheduleWrapperLine }/>
                <div className={ style.scheduleWrapperSecond }>
                  Суб.-Вос. 10:00-20:00
                </div>
              </div>
            </div>
            <div className={ style.contactBlockWrapperTel }>
              <p className={ style.tel }>Телефон</p>
              <Phone/>
            </div>
            <div className={ style.contactBlockWrapperSocial }>
              <p className={ style.socialTitle }>Пишите нам в социальных сетях</p>
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