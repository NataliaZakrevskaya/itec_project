import React from 'react';
import style from '../../../pages/ProductPage/ProductPage.module.scss';
import { OptionType } from '../../../mocks';
import { getPrice } from '../../../helpers/getPrice';

const UnitsForBasket = ( { option, active, onUnitClick }: UnitsForBasketPropsType ) => {
  const price = getPrice( +option.price );
  return (
    <>
      { !option.partial &&
        <div onClick={ () => onUnitClick( option ) } className={ active ? style.active : style.unit }>
          <p className={ style.option }>{ option.size } { option.units.unit_name }</p>
          <p className={ style.price }>{ price } BYN</p>
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