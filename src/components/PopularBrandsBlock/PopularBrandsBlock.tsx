import React from 'react';
import style from './PopularBrands.module.scss';
import commonStyle from '../../styles/common/Container.module.scss';
import { getBrands } from '../../mocks';
import Brand from './Brand/Brand';
import Button from '../common/Button/Button';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../routes/enums';

const PopularBrandsBlock = () => {

  const brands = getBrands();
  const navigate = useNavigate();

  return (
    <div className={ style.popularBrandsBlock }>
      <div className={ commonStyle.container }>
          <h2>Популярные бренды</h2>
          <div className={ style.brandsContainer }>
            {
              brands.map( brand =>
                <Brand key={ brand.id } image={ brand.image }/>,
              )
            }
        </div>
        <Button title={'Смотреть больше брендов'} onClick={() => navigate(routesPathsEnum.CATALOG)}/>
      </div>
    </div>
  );
};

export default PopularBrandsBlock;