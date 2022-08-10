import React from 'react';
import style from './nextSectionButton.module.scss';
import { SectionButtonPropsType } from '../types';

const NextSectionButton = ( { onClick, disabled }: SectionButtonPropsType ) => {
  return (
    <button
      className={ disabled ? `${ style.button } ${ style.disabledButton }` : style.button }
      onClick={ onClick }
      disabled={ disabled }
      aria-label={ 'nextSection' }
    />
  );
};

export default NextSectionButton;

