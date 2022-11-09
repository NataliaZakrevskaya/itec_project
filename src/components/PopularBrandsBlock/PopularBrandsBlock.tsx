import React, { ReactElement, useCallback, useEffect } from 'react';
import style from './PopularBrands.module.scss';
import commonStyle from '../../styles/common/Container.module.scss';
import Brand from './Brand/Brand';
import Button from '../common/Button/Button';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../routes/enums';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrandsTC, setChosenBrandId, setChosenBrandsId } from '../../redux/reducers/brands';
import { getBrands } from '../../redux/selectors/brands';
import { AppDispatch } from '../../redux/store';
import { setActualPage } from '../../redux/reducers/products';

const PopularBrandsBlock = React.memo( (): ReactElement => {

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
  }, [ dispatch ] );

  return (
    <div className={ style.popularBrandsBlock }>
      <div className={ commonStyle.container }>
        <h2 className={ style.title }>Популярные бренды</h2>
        <div className={ style.brandsContainer }>
          {
            brands
              .filter( ( brand, index ) => index < 18 )
              .map( ( { id, image, name } ) =>
                <Brand
                  key={ id }
                  id={ id }
                  name={name}
                  image={ image }
                  chooseBrand={ chooseBrand }
                  forBlock={ true }
                />,
              )
          }
        </div>
        <Button title={ 'Смотреть больше брендов' } onClick={ () => navigate( routesPathsEnum.BRANDS ) }/>
      </div>
    </div>
  );
} );

export default PopularBrandsBlock;