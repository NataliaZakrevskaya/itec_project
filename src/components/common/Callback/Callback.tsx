import React, { ReactElement, useEffect, useState } from 'react';
import CallbackModal from '../modals/CallbackModals/CallbackModal';
import style from './Callback.module.scss';
import Modal from '../modals/Modal';
import SuccessCallbackModals from '../modals/SuccessCallbackModals/SuccessCallbackModals';
import { useDispatch, useSelector } from 'react-redux';
import { getCallbackRequestStatus } from '../../../redux/selectors/app';
import { RequestStatus } from '../../../redux/reducers/enums';
import { AppDispatch } from '../../../redux/store';
import { setCallbackRequestStatus } from '../../../redux/reducers/app';
import { CallbackPropsType } from './types';
import PrivacyPolicyModal from '../modals/PrivacyPolicyModal/PrivacyPolicyModal';

const Callback = React.memo(( { forHeader }: CallbackPropsType ): ReactElement => {
  const [ isActive, setIsActive ] = useState<boolean>( false );
  const [ isPrivacyModalActive, setIsPrivacyModalActive ] = useState<boolean>( false );
  const openPrivacyPolicyModal = () => {
    setIsPrivacyModalActive(true)
  }

  const responseIsSuccess = useSelector( getCallbackRequestStatus ) === RequestStatus.SUCCEEDED;
  const responseIsIdle = useSelector( getCallbackRequestStatus ) === RequestStatus.IDLE;
  const dispatch = useDispatch<AppDispatch>();
  const closeModal = () => {
    dispatch( setCallbackRequestStatus( { status: RequestStatus.IDLE } ) );
    setIsActive( false );
    setIsPrivacyModalActive(false);
  };
  useEffect( () => {
    if ( isActive ) {
      window.document.body.style.overflow = 'hidden';
    }
    return () => {
      window.document.body.style.overflow = '';
    };
  }, [ isActive ] );

  return (
    <div>
      <p onClick={ () => setIsActive( true ) }
         className={ forHeader ? `${ style.callback }` : `${ style.callbackForFooter }` }>Обратный звонок</p>
      { isActive &&
        <Modal closeModal={ closeModal }>
          { responseIsIdle && !isPrivacyModalActive && <CallbackModal openPrivacyPolicyModal={openPrivacyPolicyModal}/> }
          {isPrivacyModalActive && <PrivacyPolicyModal/>}
          { responseIsSuccess && !isPrivacyModalActive && <SuccessCallbackModals closeModal={ closeModal }/> }
        </Modal>
      }
    </div>
  );
});

export default Callback;