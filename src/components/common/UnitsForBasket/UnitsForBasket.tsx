import React, { ReactElement } from 'react';
import style from '../../../pages/ProductPage/ProductPage.module.scss';
import { getPrice } from '../../../helpers/getPrice';
import { UnitsForBasketPropsType } from '../types';

const UnitsForBasket = ( { option, active, onUnitClick }: UnitsForBasketPropsType ): ReactElement => {
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