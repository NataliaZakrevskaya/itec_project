import React, { ReactElement } from 'react';
import style from './SmallerButton.module.scss';
import { SmallerButtonPropsType } from '../types';

const SmallerButton = React.memo(( { title, onClick }: SmallerButtonPropsType ): ReactElement => {
  return (
    <div className={ style.smallerButtonMoreProducts }>
      <button className={ style.button } onClick={ onClick }>{ title }</button>
    </div>
  );
});

export default SmallerButton;

