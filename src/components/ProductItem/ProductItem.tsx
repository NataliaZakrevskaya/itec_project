import React from 'react';
import { UnitType } from '../../mocks';
import ProductItemUnit from '../ProductItemUnit/ProductItemUnit';
import basketIcon from '../../Images/basketIcon.svg';
import style from './ProductItem.module.scss';
import { useNavigate } from 'react-router-dom';
import { routesPathsEnum } from '../../routes/enums';

const ProductItem = ( { img, title, units, price, id, classNameForDarkItem }: ProductItemPropsType ) => {

  const isKilo = units[0].name === 'кг.'
  const navigate = useNavigate()

  return (
    <div className={`${style.productItem} ${classNameForDarkItem}`}>
        <div className={style.productItemWrapper}>
            <img className={style.mainProductItemImage} src={ img } alt={ 'product' }/>
            <p className={style.title} onClick={() => navigate(`${routesPathsEnum.CATALOG}/${id}`)}>{ title }</p>
        </div>
      <div className={style.unitGroup}>
        { units.map( unit =>
          <ProductItemUnit
            key={ unit.id }
            count={ unit.count }
            name={ unit.name }
          />,
        ) }
        {isKilo && <span onClick={() => alert('Переход на страницу товара с активным блоком задания веса')}>Задать свой вес</span>}
      </div>
        <div className={style.priceBlockWrapper}>
            <div className={style.priceBlock}>
                <p className={style.price}>{ `${ price } BYN` }</p>
                <div className={style.basket} onClick={() => alert('добавить в корзину')}>
                    <p>+</p>
                    <div className={style.imageWrapper}>
                        <img src={ basketIcon } alt="basketIcon"/>
                    </div>
                </div>
            </div>
            <button onClick={() => alert('Модалка "купить в 1 клик"')}>Купить в 1 клик</button>
        </div>
    </div>
  );
};

export default ProductItem;

type ProductItemPropsType = {
  id: number,
  img: string,
  title: string,
  units: Array<UnitType>,
  price: number,
  classNameForDarkItem?: string,
}