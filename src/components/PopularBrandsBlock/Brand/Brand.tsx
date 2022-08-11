import React from 'react';
import style from './Brand.module.scss';
import { BrandPropsType } from './types';

const Brand = ( { id, image, chooseBrand }: BrandPropsType ) => {
  return (
    <div className={ style.brand } onClick={ () => chooseBrand( id ) }>
      <img src={ image } loading={'lazy'} alt={ 'brand' }/>
    </div>
  );
};

export default Brand;