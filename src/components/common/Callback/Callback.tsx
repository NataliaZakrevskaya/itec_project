import React, { useState } from 'react';
import CallbackModal from '../modals/CallbackModals/CallbackModal';
import style from './Callback.module.scss';
import Modal from '../modals/Modal';
import SuccessCallbackModals from '../modals/SuccessCallbackModals/SuccessCallbackModals';

const Callback = () => {
  const [ isActive, setIsActive ] = useState<boolean>( false );
  const responseIsDone = true; //todo будет меняться в зависимости от успеха запроса
  const closeModal = () => {
    setIsActive( false );
  };
  return (
    <div>
      <p onClick={ () => setIsActive( true ) } className={ style.callback }>Обратный звонок</p>
      { isActive &&
        <Modal closeModal={ closeModal }>
          { responseIsDone ? <CallbackModal/> : <SuccessCallbackModals closeModal={ closeModal }/> }
        </Modal>
      }
    </div>
  );
};

export default Callback;