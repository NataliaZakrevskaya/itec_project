import { useEffect, useRef, useState } from 'react';
import { BlockNames } from './enums';

export const useCarousel = ( blockName: BlockNameType, itemsCount: number ) => {

  const [ offset, setOffset ] = useState( 0 );
  const [ isNextDisabled, setIsNextDisabled ] = useState( false );
  const [ isPrevDisabled, setIsPrevDisabled ] = useState( true );
  const [ width, setWidth ] = useState( 1200 );
  const windowElRef = useRef( null );

  const getIsNextButtonDisables = () => {
    if ( blockName === BlockNames.REVIEWS ) setIsNextDisabled( itemsCount <= 1 );
    if ( blockName === BlockNames.ARTICLES ) {
      if ( width >= 1180 ) setIsNextDisabled( itemsCount <= 3 );
      if ( width < 1180 ) setIsNextDisabled( itemsCount <= 2 );
    }
    if ( blockName === BlockNames.PRODUCTS ) {
      if ( width >= 1179 ) setIsNextDisabled( itemsCount <= 4 );
      if ( width === 940 ) setIsNextDisabled( itemsCount <= 3 );
      if ( width < 940 ) setIsNextDisabled( itemsCount <= 2 );
    }
  };
  /*  let className;
    const getIsWithGap = () => {
      if ( blockName === BlockNames.PRODUCTS ) {
        if ( width > 940 ) {
          if ( itemsCount <= 4 ) {
            return className='commonStyle.productsLessThenFive'
          } else return className='commonStyle.allProductItemsContainer'
        }
        if ( width <= 940 && width > 700 ){
          if ( itemsCount <= 3 ) {
            return className='commonStyle.productsLessThenFive'
          } else return className='commonStyle.allProductItemsContainer'
        }
        if ( width <= 700 ){
          if ( itemsCount <= 3 ) {
            return className='commonStyle.productsLessThenFive'
          } else return className='commonStyle.allProductItemsContainer'
        }
      }
    };*/

  useEffect( () => {
    const resizeHandler = () => {
      // @ts-ignore
      const _width = windowElRef?.current.offsetWidth;
      setWidth( _width );
      getIsNextButtonDisables();
    };
    resizeHandler();
    window.addEventListener( 'resize', resizeHandler );

    return () => {
      window.removeEventListener( 'resize', resizeHandler );
    };
  }, [ width, itemsCount ] );

  const getPagesCount = () => {
    if ( blockName === BlockNames.REVIEWS ) return itemsCount;
    if ( blockName === BlockNames.ARTICLES ) {
      if ( width >= 940 ) return itemsCount / 3;
      if ( width < 940 && width >= 700 ) return itemsCount / 2;
      if ( width < 700 && width >= 520 ) return itemsCount / ( 1 + ( ( width - ( 280 + ( width * 0.05 ) ) ) / 280 ) );
      return itemsCount / ( 1 + ( ( width - ( 280 + ( width * 0.04 ) ) ) / 280 ) );
    }
    if ( blockName === BlockNames.PRODUCTS ) {
      if ( width > 940 ) return itemsCount / 4;
      if ( width < 941 && width > 700 ) return itemsCount / 3;
      if ( width < 701 && width >= 520 ) return itemsCount / 2;
      if ( width < 520 && width > 400 ) return 3120 / width;
      else return 3200 / width;
    }
    if ( blockName === BlockNames.ANIMALS ) {
      if ( width >= 940 ) return 1;
      if ( width < 940 && width >= 700 ) return itemsCount / ( width / ( 158 + 24 ) );
      else return itemsCount / ( width / ( 137 + 16 ) );
    }
    return 1;
  };

  const pagesCount = getPagesCount();

  const onPrevSectionButtonClick = () => {
    setOffset( ( currentOffset ) => {
      const newOffset = currentOffset + width;
      setIsNextDisabled( false );
      setIsPrevDisabled( 0 < newOffset + width );
      return Math.min( newOffset, 0 );
    } );
  };
  const onNextSectionButtonClick = () => {
    setOffset( ( currentOffset ) => {
      const newOffset = currentOffset - width;
      const maxOffset = -( width * ( pagesCount - 1 ) );
      setIsNextDisabled( maxOffset > newOffset - width );
      setIsPrevDisabled( false );
      return Math.max( newOffset, maxOffset );
    } );
  };

  const [ x, setX ] = useState<null | number>( null );
  const [ x2, setX2 ] = useState<null | number>( null );

  const onTouchStart = ( event: any ) => {
    setX( event.touches[ 0 ].clientX );
  };

  const getDiff = () => {
    if ( blockName === BlockNames.PRODUCTS ) {
      if ( width >= 520 ) return width;
      if ( width < 520 && width > 400 ) return 239 + ( width * 0.04 );
      if ( width <= 400 ) return 239 + ( width * 0.071 );
      return width;
    }
    if ( blockName === BlockNames.ARTICLES ) {
      if ( width >= 700 ) return width;
      else return 280 + ( width * 0.03 );
    }
    if ( blockName === BlockNames.ANIMALS ) {
      if ( width >= 520 ) return width;
      else return 137 + 16;
    } else return width;
  };
  const onTouchEnd = ( event: any ) => {
    if ( !x ) return false;
    setX2( event.changedTouches[ 0 ].clientX );
    if ( x && x2 ) {
      if ( x2 - x < 0 ) {
        setOffset( ( currentOffset ) => {
          const newOffset = currentOffset - getDiff();
          const maxOffset = -( width * ( pagesCount - 1 ) );
          return Math.max( newOffset, maxOffset );
        } );
      }
      if ( x2 - x > 0 ) {
        setOffset( ( currentOffset ) => {
          const newOffset = currentOffset + getDiff();
          return Math.min( newOffset, 0 );
        } );
      }
    }
  };

  return {
    offset,
    isNextDisabled,
    isPrevDisabled,
    onPrevSectionButtonClick,
    onNextSectionButtonClick,
    windowElRef,
    onTouchStart,
    onTouchEnd,
    width,
  };
};

type BlockNameType = 'reviews' | 'products' | 'articles' | 'animals'