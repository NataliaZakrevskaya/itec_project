import React, { ReactElement, useEffect } from 'react';
import style from './AdvertisingBlock.module.scss';
import commonStyle from '../../styles/common/Container.module.scss';
import buttonStyle from '../../styles/common/BigButton.module.scss';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../routes/enums';
import { useDispatch, useSelector } from 'react-redux';
import { getMainInfo } from '../../redux/selectors/descriptionShop';
import { AppDispatch } from '../../redux/store';
import { fetchDescriptionShopTC } from '../../redux/reducers/descriptionShop';

export const AdvertisingBlock = React.memo( (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { main_title, option_one, option_two, photo_main_page } = useSelector( getMainInfo );
  useEffect( () => {
    dispatch( fetchDescriptionShopTC() );
  }, [ dispatch ] );
  return (
    <div className={ style.advertisingBlockContainer }>
      <div className={ commonStyle.container }>
        <div className={ style.advertisingBlock }>
          <div className={ style.mainWrapper }>
            <h1 className={ style.mainTitle } dangerouslySetInnerHTML={ { __html: main_title } }/>
            <div className={ style.subTitleWrapper }>
              <div className={ style.subTitleOne }>
                <div dangerouslySetInnerHTML={ { __html: option_one } }/>
              </div>
              <div className={ style.subTitleTwo }>
                <div dangerouslySetInnerHTML={ { __html: option_two } }/>
              </div>
            </div>
            <button className={ buttonStyle.bigButton } onClick={ () => navigate( routesPathsEnum.CATALOG ) }>Выбрать
              товар
            </button>
          </div>
          <div className={ style.mainImage }>
            <img src={ photo_main_page } loading={ 'lazy' } alt="frame"/>
          </div>
        </div>
      </div>
    </div>
  )
    ;
} );
