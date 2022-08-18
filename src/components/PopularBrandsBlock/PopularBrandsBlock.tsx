import React, { ReactElement, useCallback, useEffect } from 'react';
import style from './PopularBrands.module.scss';
import commonStyle from '../../styles/common/Container.module.scss';
import Brand from './Brand/Brand';
import Button from '../common/Button/Button';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../routes/enums';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrandsTC, setChosenBrandId } from '../../redux/reducers/brands';
import { getBrands } from '../../redux/selectors/brands';
import { AppDispatch } from '../../redux/store';

const PopularBrandsBlock = React.memo( (): ReactElement => {

  const brands = useSelector( getBrands );
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const chooseBrand = useCallback( ( id: number ) => {
    dispatch( setChosenBrandId( { id } ) );
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
            brands.map( ( { id, image } ) =>
              <Brand
                key={ id }
                id={ id }
                image={ image }
                chooseBrand={ chooseBrand }
              />,
            )
          }
        </div>
        <Button title={ 'Смотреть больше брендов' } onClick={ () => navigate( routesPathsEnum.CATALOG ) }/>
      </div>
    </div>
  );
} );

export default PopularBrandsBlock;