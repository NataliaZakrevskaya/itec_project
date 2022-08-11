import React from 'react';
import style from '../../../Header/SearchResultsBlock/SearchResultsBlock.module.scss';
import sadDog from '../../../../Images/emtyBrands.jpg';
import SmallerButton from '../../SmallerButton/SmallerButton';
import { RejectSearchResultPropsType } from '../types';

const RejectSearchResult = React.memo(( { requestTitle, onClick }: RejectSearchResultPropsType ) => {

  return (
    <div className={ style.rejectResultContainer }>
      <img className={ style.rejectResultImage } loading={'lazy'} src={ sadDog } alt="sadDog"/>
      <div className={ style.textBlock }>
        <p>По вашему запросу ничего не найдено. Попробуйте изменить запрос или выбрать { requestTitle } в нашем
          каталоге </p>
      </div>
      <SmallerButton title={ 'Перейти в каталог' } onClick={ onClick }/>
    </div>
  );
});

export default RejectSearchResult;