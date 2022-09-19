import style from './Modal.module.scss';
import closeIcon from '../../../Images/closeIcon.svg';
import React, { ReactElement } from 'react';
import { ModalPropsType } from './types';

const Modal = ( { closeModal, children }: ModalPropsType ): ReactElement => {
  return (
    <div className={ style.callbackModals }>
      <div className={ style.modalContent } onClick={ e => e.stopPropagation() }>
        <div className={ style.closeIcon } onClick={ closeModal }>
          <img src={ closeIcon } loading={ 'lazy' } alt="closeIcon" draggable="false"/>
        </div>
        { children }
      </div>
    </div>
  );
};

export default Modal;