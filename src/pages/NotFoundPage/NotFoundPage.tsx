import React from 'react';
import style from './NotFoundPage.module.scss';
import commonStyle from '../../styles/common/Container.module.scss';
import buttonStyle from '../../styles/common/BigButton.module.scss';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../routes/enums';

const NotFoundPage = () => {

  const navigate = useNavigate();
  return (
    <div className={ `${ style.notFoundPageContainer } ${ commonStyle.container }` }>
      <div className={ style.textContainer }>
        <h1>404</h1>
        <h2>Мрр... Мяу! </h2>
        <h2>Страница не найдена</h2>
        <p>Страничку, которую вы ищите не существует или она была удалена</p>
        <p className={ style.lastParagraph }>Советуем перейти на главную, там можно найти много интересного для вашего
          любимого питомца</p>
        <button className={ buttonStyle.bigButton } onClick={ () => navigate( routesPathsEnum.MAIN ) }>Вернуться на
          главную
        </button>
      </div>
      <div>
        <div className={ style.notFoundImage }/>
      </div>
    </div>
  );
};

export default NotFoundPage;