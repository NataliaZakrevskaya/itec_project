import React from 'react';
import style from './AdvertisingBlock.module.scss';
import commonStyle from '../../styles/common/Container.module.scss';
import Button from '../common/Button/Button';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../routes/enums';
import feed from '../../Images/feed.svg';
import fishBowl from '../../Images/fishBowl.svg';
import catsHouse from '../../Images/catsHouse.svg';
import dogFood from '../../Images/dogFood.svg';
import litterBox from '../../Images/litterBox.svg';
import parrot from '../../Images/parrot.svg';
import parrotFood from '../../Images/parrotFood.svg';

const AdvertisingBlock = () => {

  const navigate = useNavigate();

  return (
    <div className={ style.advertisingBlockContainer }>
      <div className={ commonStyle.container }>
        <div className={style.advertisingBlock}>
          <div className={style.mainWrapper}>
            <h1 className={style.mainTitle}>Всё, что нужно вашему питомцу в 9 мин от метро Малиновка</h1>
            <div className={style.subTitleWrapper}>
              <div className={style.subTitleOne}>
                <p>
                  <span>Более 5000 товаров </span>
                  для животных в наличии
                </p>
              </div>
              <div className={style.subTitleTwo}>
                <p>
                  <span>Вкусные сюрпризы </span>
                  для ваших питомцев в магазине
                </p>
              </div>
            </div>
            <Button title={ 'Выбрать товар' } onClick={ () => navigate( routesPathsEnum.CATALOG ) }/>
          </div>
          <div className={style.mainImage}>
            <img src="../Images/Frame 119.png" alt=""/>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertisingBlock;