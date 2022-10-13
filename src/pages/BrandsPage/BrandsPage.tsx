import React, { useCallback, useEffect } from 'react';
import navigationStyle from '../../styles/common/NavigationBlock.module.scss';
import nextIcon from '../../Images/nextIcon.svg';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../routes/enums';
import style from './BrandsPage.module.scss';
import { fetchBrandsTC, setChosenBrandId, setChosenBrandsId } from '../../redux/reducers/brands';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from '../../redux/selectors/brands';
import { AppDispatch } from '../../redux/store';
import Brand from '../../components/PopularBrandsBlock/Brand/Brand';
import { setActualPage } from '../../redux/reducers/products';

const BrandsPage = () => {
  const brands = useSelector( getBrands );
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const chooseBrand = useCallback( ( id: number ) => {
    const pageNumber = 1;
    dispatch( setActualPage( { pageNumber } ) );
    dispatch( setChosenBrandId( { id } ) );
    dispatch( setChosenBrandsId( { id } ) );
    navigate( routesPathsEnum.CATALOG );
  }, [ dispatch, navigate ] );
  useEffect( () => {
    dispatch( fetchBrandsTC() );
  }, [dispatch] );
  return (
    <div className={ style.brandsPage }>
      <div className={ navigationStyle.navigationBlock }>
        <div className={ navigationStyle.navigationBlockWrapper }>
          <p onClick={ () => navigate( routesPathsEnum.MAIN ) }>Главная</p>
          <img src={ nextIcon } loading={ 'lazy' } alt="nextIcon" draggable="false"/>
          <p>Бренды</p>
        </div>
      </div>
      <div className={ style.brandsPageInfo }>
        <h1>Все бренды</h1>
        <div className={ style.brandsContainer }>
          {
            brands.map( ( { id, image } ) =>
              <Brand
                key={ id }
                id={ id }
                image={ image }
                chooseBrand={ chooseBrand }
                forBlock={false}
              />,
            )
          }
        </div>
      </div>
    </div>
  );
};

export default BrandsPage;