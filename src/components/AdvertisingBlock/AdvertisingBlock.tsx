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
          <div>
            <h1>Всё, что нужно вашему питомцу в 9 мин от метро Малиновка</h1>
            <div>
              <p>
                <span>Более 5000 товаров </span>
                для животных в наличии
              </p>
            </div>
            <div>
              <p>
                <span>Вкусные сюрпризы </span>
                для ваших питомцев в магазине
              </p>
            </div>
            <Button title={ 'Выбрать товар' } onClick={ () => navigate( routesPathsEnum.CATALOG ) }/>
          </div>
          <div>
            <img src={ feed } alt="feed"/>
            <img src={ catsHouse } alt="catsHouse"/>
            <img src={ fishBowl } alt="fishBowl"/>
            <img src={ dogFood } alt="dogFood"/>
            <img src={ litterBox } alt="litterBox"/>
            <img src={ parrot } alt="parrot"/>
            <img src={ parrotFood } alt="parrotFood"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertisingBlock;