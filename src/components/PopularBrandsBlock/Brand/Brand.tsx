import React from 'react';
import style from './Brand.module.scss';

const Brand = ( { id, image, chooseBrand }: BrandPropsType ) => {
  return (
    <div className={ style.brand } onClick={ () => chooseBrand( id, true ) }>
      <img src={ image } alt={ 'brand' }/>
    </div>
  );
};

export default Brand;

type BrandPropsType = {
  id: number
  image: string
  chooseBrand: ( id: number, chosen: boolean ) => void
}