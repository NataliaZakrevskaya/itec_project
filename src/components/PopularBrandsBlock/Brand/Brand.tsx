import React from 'react';
import style from './Brand.module.scss';

const Brand = ( props: BrandPropsType ) => {
  return (
    <div className={ style.brand }>
      <img src={ props.image } alt={ 'brand' }/>
    </div>
  );
};

export default Brand;

type BrandPropsType = {
  image: string
}