import React, { ReactElement } from 'react';
import style from './ContactBlock.module.scss';
import commonStyle from '../../styles/common/Container.module.scss';
import Phone from '../common/PhoneBlock/Phone';
import instagramIcon from '../../Images/instagramIcon.svg';
import { Map, Placemark, YMaps } from 'react-yandex-maps';
import metroIcon from '../../Images/metroIcon.svg';
import navigationIcon from '../../Images/navigateIcon.svg';
import IconTime from '../../Images/clock_minorfooter.svg';
import { useSelector } from 'react-redux';
import { getInfo } from '../../redux/selectors/descriptionShop';

const ContactBlock = React.memo((): ReactElement => {
  const { phone_number, address, metro, time_weekdays, time_weekend, social } = useSelector( getInfo );
  return (
    <div className={ style.contactBlockContainer }>
      <div className={ commonStyle.container }>
        <div className={ style.contactBlock }>
          <div className={ style.contactBlockMapWrapper }>
            <YMaps>
              <Map defaultState={ { center: [ 53.854422, 27.478944 ], zoom: 15 } } className={ style.map }>
                <Placemark geometry={ [ 53.854422, 27.478944 ] }/>
              </Map>
            </YMaps>
          </div>
          <div className={ style.contactBlockWrapper }>
            <h3 className={ style.contactBlockWrapperTitle }>Бесплатно проконсультируем по любому вопросу связанному с
              вашим любимцем</h3>
            <div className={ style.contactBlockWrapperDirection }>
              <div className={ style.contactBlockAddressWrapper }>
                <img src={ navigationIcon } loading={'lazy'} alt=""/>
                <p>{ address }</p>
              </div>
              <div className={ style.contactBlockWrapperMetro }>
                <img src={ metroIcon } loading={'lazy'} alt=""/>
                <p>{ metro }</p>
              </div>
            </div>
            <div className={ style.contactBlockWrapperTimeWork }>
              <p className={ style.timeWork }>Время работы</p>
              <div className={ style.scheduleWrapper }>
                <div className={ style.scheduleWrapperFirst }>
                  <img src={ IconTime } loading={'lazy'} alt="timeIcon"/>
                  <p>Пон.-Пят. { time_weekdays }</p>
                </div>
                <div className={ style.scheduleWrapperLine }/>
                <p className={ style.scheduleWrapperSecond }>
                  Суб.-Вос. { time_weekend }
                </p>
              </div>
            </div>
            <div className={ style.contactBlockWrapperTel }>
              <p className={ style.tel }>Телефон</p>
              <Phone phoneNumber={ phone_number }/>
            </div>
            <div className={ style.contactBlockWrapperSocial }>
              <p className={ style.socialTitle }>Пишите нам в социальных сетях</p>
              <a href={ social } target={ '_blank' } rel={ 'noreferrer' } className={style.instaIcon}>
                <img src={ instagramIcon } loading={'lazy'} alt={ 'instagramIcon' }/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ContactBlock;