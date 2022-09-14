import React, { ReactElement } from 'react';
import style from './PrivacyPolicyModal.module.scss';
import { getPrivacyPolicyText } from '../../../../redux/selectors/descriptionShop';
import { useSelector } from 'react-redux';

const PrivacyPolicyModal = (): ReactElement => {

  const privacyPolicyText = useSelector( getPrivacyPolicyText );

  return (
    <div className={style.hideScroll}>
    <div className={ style.modalContainer }>
      <h1>Политика конфиденциальности</h1>
      <div dangerouslySetInnerHTML={ { __html: privacyPolicyText } }/>
    </div>
    </div>
  );
};

export default PrivacyPolicyModal;