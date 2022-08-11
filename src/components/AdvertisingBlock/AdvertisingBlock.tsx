import React from 'react';
import style from './AdvertisingBlock.module.scss';
import commonStyle from '../../styles/common/Container.module.scss';
import buttonStyle from '../../styles/common/BigButton.module.scss';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../routes/enums';
import frame from '../../Images/MainImage.jpg';

const AdvertisingBlock = () => {

  const navigate = useNavigate();

  return (
    <div className={ style.advertisingBlockContainer }>
      <div className={ commonStyle.container }>
        <div className={ style.advertisingBlock }>
          <div className={ style.mainWrapper }>
            <h1 className={ style.mainTitle }>Всё, что нужно вашему питомцу в 9 мин от метро Малиновка</h1>
            <div className={ style.subTitleWrapper }>
              <div className={ style.subTitleOne }>
                <p>
                  <span>Более 5000 товаров </span>
                  для животных в наличии
                </p>
              </div>
              <div className={ style.subTitleTwo }>
                <p>
                  <span>Вкусные сюрпризы </span>
                  для ваших питомцев в магазине
                </p>
              </div>
            </div>
            <button className={ buttonStyle.bigButton } onClick={ () => navigate( routesPathsEnum.CATALOG ) }>Выбрать
              товар
            </button>
          </div>
          <div className={ style.mainImage }>
            <img src={ frame } loading={'lazy'} alt="frame"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertisingBlock;