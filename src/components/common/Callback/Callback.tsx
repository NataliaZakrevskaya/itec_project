import React from 'react';
import style from './Callback.module.scss';

const Callback = () => {

  const callBack = () => {
    alert('Будет модалка')
  }

  return (
    <div>
      <p onClick={callBack} className={ style.callback }>Обратный звонок</p>
    </div>
  );
};

export default Callback;