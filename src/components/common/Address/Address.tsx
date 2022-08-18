import React, { ReactElement } from 'react';
import navigateIcon from '../../../Images/navigateIcon.svg';
import metroIcon from '../../../Images/metroIcon.svg';
import style from './Address.module.scss';
import { AddressPropsType } from './types';

const Address = React.memo(( { address, metro }: AddressPropsType ): ReactElement => {

  return (
    <div className={ style.addressBlock }>
      <div className={ style.addressBlockWrapperOne }>
        <img className={ style.navigateIcon } loading={'lazy'} src={ navigateIcon } alt={ 'navigateIcon' }/>
        <p className={ style.textStyle }>{ address }</p>
      </div>
      <div className={ style.addressBlockWrapperTwo }>
        <img className={ style.metroIcon } loading={'lazy'} src={ metroIcon } alt={ 'metroIcon' }/>
        <p>{ metro }</p>
      </div>
    </div>
  );
});

export default Address;

