import React, { ReactElement } from 'react';
import style from './Brand.module.scss';
import { BrandPropsType } from './types';

const Brand = React.memo( ( { id, name, image, chooseBrand, forBlock }: BrandPropsType ): ReactElement => {
  return (
    <div className={ forBlock ? style.brand : style.brandForPage } onClick={ () => chooseBrand( id ) }>
      <img src={ image } loading={ 'lazy' } alt={ name } draggable="false"/>
    </div>
  );
} );

export default Brand;