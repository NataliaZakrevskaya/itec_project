import React, { useEffect } from 'react';
import style from './GreetingBlock.module.scss';
import commonStyle from '../../styles/common/Container.module.scss';
import { fetchDescriptionShopTC } from '../../redux/reducers/descriptionShop-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { getDescriptionShop, getPhoto, getSecondInfo } from '../../redux/selectors/descriptionShop-selectors';

const GreetingBlock = React.memo(() => {

  const photo = useSelector( getPhoto );
  const secondInfoOptions = useSelector( getSecondInfo );
  const { title, main_info } = useSelector( getDescriptionShop );

  const dispatch = useDispatch<AppDispatch>();

  useEffect( () => {
    dispatch( fetchDescriptionShopTC() );
  }, [] );

  return (
    <div className={ style.greetingBlock }>
      <div className={ commonStyle.container }>
        <div className={ style.greetingBlockContainer }>
          <div className={ style.greetingBlockWrapperText }>
            <h2 className={ style.greetingBlockTitle } dangerouslySetInnerHTML={ { __html: title } }/>
            <div className={ style.greetingBlockTextWrapper }>
              <p className={ style.greetingBlockText } dangerouslySetInnerHTML={ { __html: main_info } }/>
            </div>
            { secondInfoOptions.map( option =>
              <div key={ option.id } className={ style.greetingBlockWrapper }>
                <div className={ style.greetingOptionWrapper }>
                  <div className={ style.greetingBlockWrapperTitle }
                       dangerouslySetInnerHTML={ { __html: option.info_title } }/>
                  <p className={ style.greetingBlockText } dangerouslySetInnerHTML={ { __html: option.info_text } }/>
                </div>
              </div>,
            ) }
          </div>
          <div className={ style.greetingBlockImageWrapper }>
            <img src={ photo } loading={'lazy'} alt="shopPhoto"/>
          </div>
        </div>
      </div>
    </div>
  );
});

export default GreetingBlock;