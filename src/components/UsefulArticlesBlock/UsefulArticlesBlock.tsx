import React, { useEffect, useRef, useState } from 'react';
import Article from '../common/Article/Article';
import style from './UsefulArticlesBlock.module.scss';
import commonStyle from '../../styles/common/Container.module.scss';
import Button from '../common/Button/Button';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../routes/enums';
import PrevSectionButton from '../common/prevSectionButton/prevSectionButton';
import NextSectionButton from '../common/nextSectionButton/nextSectionButton';
import themeStyle from '../../styles/common/DarkBlock.module.scss';
import { useSelector } from 'react-redux';
import { getChosenAnimalTypeId } from '../../redux/selectors/animalTypes-selectors';
import { getTitleForArticlesBlock } from '../../helpers/getTitle';
import { getArticles } from '../../redux/selectors/articles-selectors';

const UsefulArticlesBlock = () => {

  const articles = useSelector(getArticles);
  const navigate = useNavigate();
  const chosenAnimalTypeId = useSelector( getChosenAnimalTypeId );
  const subTitle = getTitleForArticlesBlock( chosenAnimalTypeId );

  const [ offset, setOffset ] = useState( 0 );
  const [ width, setWidth ] = useState( 1200 );
  const [ isNextDisabled, setIsNextDisabled ] = useState( false );
  const [ isPrevDisabled, setIsPrevDisabled ] = useState( true );

  const windowElRef = useRef( null );

  useEffect( () => {
    const resizeHandler = () => {

      // @ts-ignore
      const _width = windowElRef?.current.offsetWidth;
      setWidth( _width );
      setOffset( 0 );
      setIsPrevDisabled(true)
      setIsNextDisabled(false)
    };
    resizeHandler();
    window.addEventListener( 'resize', resizeHandler );

    return () => {
      window.removeEventListener( 'resize', resizeHandler );
    };
  }, [ width ] );

  const onPrevSectionButtonClick = () => {
    setOffset( ( currentOffset ) => {
      const newOffset = currentOffset + width + ( width / 100 * 1.8 );
      setIsNextDisabled( false );
      setIsPrevDisabled( 0 < newOffset + width );
      return Math.min( newOffset, 0 );
    } );
  };
  const onNextSectionButtonClick = () => {
    setOffset( ( currentOffset ) => {
      const newOffset = currentOffset - width - ( width / 100 * 1.4 );
      const maxOffset = -( width * ( ( articles.length / 4 ) - 1 ) + ( width / 100 * 7 ) );
      setIsNextDisabled( maxOffset > newOffset - width );
      setIsPrevDisabled( false );
      return Math.max( newOffset, maxOffset );
    } );
  };

  return (
    <div className={ `${ commonStyle.block } ${ themeStyle.block }` }>
      <div className={ commonStyle.container }>
        <div className={ commonStyle.navigationInfoBlock }>
          <h2>{ `Полезные статьи ${subTitle}` }</h2> {/*//todo будет зависить от выбранного типа животного*/ }
          <div className={ `${ commonStyle.sectionsBlock } ${ themeStyle.sectionsBlock }` }>
            <PrevSectionButton disabled={ isPrevDisabled } onClick={ onPrevSectionButtonClick }/>
            <NextSectionButton disabled={ isNextDisabled } onClick={ onNextSectionButtonClick }/>
          </div>
        </div>
        <div className={ style.articlesContainer }>
          <div className={ style.window } ref={ windowElRef }>
            <div className={ style.allArticlesItemsContainer }
                 style={ {
                   transform: `translateX(${ offset }px)`,
                 } }>
              {
                articles.map( article => {
                  const { id, title, description, date_added, image, time_read } = { ...article };
                  return ( <Article
                      key={ id }
                      id={ id }
                      image={ image }
                      title={ title }
                      description={ description }
                      date_added={ date_added }
                      timeForReading={ time_read }
                    />
                  );
                } )
              }
            </div>
          </div>
        </div>
        <Button title={ 'Смотреть больше статей' } onClick={ () => navigate( routesPathsEnum.ARTICLES ) }/>
      </div>
    </div>
  );
};

export default UsefulArticlesBlock;