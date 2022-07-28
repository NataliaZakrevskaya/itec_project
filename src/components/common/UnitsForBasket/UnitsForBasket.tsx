import React from 'react';
import style from '../../../pages/ProductPage/ProductPage.module.scss';
import { OptionType } from '../../../mocks';

const UnitsForBasket = ( { option, active, onUnitClick }: UnitsForBasketPropsType ) => {
  const onClick = () => {
    onUnitClick( option );
  };

  return (
    <>
      { !option.partial &&
        <div onClick={ onClick } className={ active ? style.active : style.unit }>
          <p className={ style.option }>{ option.size } { option.units.unit_name }</p>
          <p className={ style.price }>{ option.price } BYN</p>
        </div>
      }
    </>
  );
};

export default UnitsForBasket;

type UnitsForBasketPropsType = {
  option: OptionType,
  active: boolean,
  onUnitClick: ( option: OptionType ) => void,
}