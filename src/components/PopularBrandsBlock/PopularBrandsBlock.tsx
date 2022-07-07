import React, { useEffect } from 'react';
import style from './PopularBrands.module.scss';
import commonStyle from '../../styles/common/Container.module.scss';
import Brand from './Brand/Brand';
import Button from '../common/Button/Button';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../routes/enums';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrandsTC, setBrandStatus } from '../../redux/reducers/brands-reducer';
import { getBrands } from '../../redux/selectors/brands-selectors';

const PopularBrandsBlock = () => {

  const brands = useSelector( getBrands );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const chooseBrand = ( id: number, isChosen: boolean ) => {
    dispatch( setBrandStatus( { id, isChosen } ) );
    navigate( routesPathsEnum.CATALOG );
  };
  useEffect( () => {
    // @ts-ignore
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