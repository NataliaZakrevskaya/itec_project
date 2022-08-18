import React, { ReactElement, useEffect } from 'react';
import style from './GreetingBlock.module.scss';
import commonStyle from '../../styles/common/Container.module.scss';
import { fetchDescriptionShopTC } from '../../redux/reducers/descriptionShop';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { getDescriptionShop, getPhoto, getSecondInfo } from '../../redux/selectors/descriptionShop';

const GreetingBlock = React.memo( (): ReactElement => {

  const photo = useSelector( getPhoto );
  const secondInfoOptions = useSelector( getSecondInfo );
  const { title, main_info } = useSelector( getDescriptionShop );

  const dispatch = useDispatch<AppDispatch>();

  useEffect( () => {
    dispatch( fetchDescriptionShopTC() );
  }, [ dispatch ] );

  return (
    <div className={ style.greetingBlock }>
      <div className={ commonStyle.container }>
        <div className={ style.greetingBlockContainer }>
          <div className={ style.greetingBlockWrapperText }>
            <h2 className={ style.greetingBlockTitle } dangerouslySetInnerHTML={ { __html: title } }/>
            <div className={ style.greetingBlockTextWrapper }>
              <p className={ style.greetingBlockText } dangerouslySetInnerHTML={ { __html: main_info } }/>
            </div>
            { secondInfoOptions.map( ( { id, info_title, info_text } ) =>
              <div key={ id } className={ style.greetingBlockWrapper }>
                <div className={ style.greetingOptionWrapper }>
                  <div className={ style.greetingBlockWrapperTitle }
                       dangerouslySetInnerHTML={ { __html: info_title } }/>
                  <p className={ style.greetingBlockText } dangerouslySetInnerHTML={ { __html: info_text } }/>
                </div>
              </div>,
            ) }
          </div>
          <div className={ style.greetingBlockImageWrapper }>
            <img src={ photo } loading={ 'lazy' } alt="shopPhoto"/>
          </div>
        </div>
      </div>
    </div>
  );
} );

export default GreetingBlock;