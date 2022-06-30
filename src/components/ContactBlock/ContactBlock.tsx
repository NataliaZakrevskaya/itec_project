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
          <div className={style.contactBlockImageWrapper}>
            <img src={map} alt="map"/> {/*//todo заглушка карты*/}
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