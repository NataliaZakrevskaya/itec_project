import React from 'react';
import style from '../../../Header/SearchResultsBlock/SearchResultsBlock.module.scss';
import sadDog from '../../../../Images/sadDog.svg';
import SmallerButton from '../../SmallerButton/SmallerButton';

const RejectSearchResult = ({requestTitle}: RejectSearchResultPropsType) => {
  return (
    <div  className={style.rejectResultContainer}>
      <img className={style.rejectResultImage} src={sadDog} alt="sadDog"/>
      <div className={style.textBlock}>
        <p>По вашему запросу ничего не найдено. Попробуйте изменить запрос или выбрать {requestTitle} в нашем каталоге </p>
      </div>
      <SmallerButton title={'Перейти в каталог'} onClick={() => alert('dvmk')}/>
    </div>
  );
};

export default RejectSearchResult;

type RejectSearchResultPropsType = {
  requestTitle: string
}