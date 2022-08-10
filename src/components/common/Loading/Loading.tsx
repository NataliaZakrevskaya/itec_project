import React from 'react';
import style from './Loading.module.scss';

const Loading = () => {
  return (
    <div className={ style.loadingContainer }>
      <div className={ style.loadingIcon }/>
    </div>
  );
};

export default Loading;