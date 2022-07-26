import React, { useEffect } from 'react';
import style from './PopularBrands.module.scss';
import commonStyle from '../../styles/common/Container.module.scss';
import Brand from './Brand/Brand';
import Button from '../common/Button/Button';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../routes/enums';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrandsTC, setChosenBrandId } from '../../redux/reducers/brands-reducer';
import { getBrands } from '../../redux/selectors/brands-selectors';
import { AppDispatch } from '../../redux/store';

const PopularBrandsBlock = () => {

  const brands = useSelector( getBrands );
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const chooseBrand = ( id: number ) => {
    dispatch( setChosenBrandId( { id } ) );
    navigate( routesPathsEnum.CATALOG );
  };
  useEffect( () => {
    dispatch( fetchBrandsTC() );
  }, [] );

  return (
    <div className={ style.popularBrandsBlock }>
      <div className={ commonStyle.container }>
        <h2>Популярные бренды</h2>
        <div className={ style.brandsContainer }>
          {
            brands.map( brand =>
              <Brand
                key={ brand.id }
                id={ brand.id }
                image={ brand.image }
                chooseBrand={ chooseBrand }
              />,
            )
          }
        </div>
        <Button title={ 'Смотреть больше брендов' } onClick={ () => navigate( routesPathsEnum.CATALOG ) }/>
      </div>
    </div>
  );
};

export default PopularBrandsBlock;