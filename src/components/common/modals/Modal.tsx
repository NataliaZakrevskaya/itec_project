import style from './Modal.module.scss';
import closeIcon from '../../../Images/closeIcon.svg';
import React from 'react';

const Modal = ( { closeModal, children }: ModalPropsType ) => {
  return (
    <div className={ style.callbackModals } onClick={ closeModal }>
      <div className={ style.modalContent } onClick={ e => e.stopPropagation() }>
        <div className={ style.closeIcon } onClick={ closeModal }>
          <img src={ closeIcon } alt="closeIcon"/>
        </div>
        { children }
      </div>
    </div>
  );
};

export default Modal;

type ModalPropsType = {
  closeModal: () => void
  children: any
}