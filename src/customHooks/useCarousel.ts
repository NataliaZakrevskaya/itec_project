import { useEffect, useRef, useState } from 'react';
import { AnimalCardWidth, AnimalListGap, BlockNames, ProductCardWidth, ProductListGap, ProductsCount } from './enums';
import { BlockNameType } from './types';

export const useCarousel = ( blockName: BlockNameType, itemsCount: number ) => {

  const [ offset, setOffset ] = useState( 0 );
  const [ isNextDisabled, setIsNextDisabled ] = useState( false );
  const [ isPrevDisabled, setIsPrevDisabled ] = useState( true );
  const [ x, setX ] = useState<null | number>( null );
  const [ x2, setX2 ] = useState<null | number>( null );
  const [ width, setWidth ] = useState( 1200 );
  const windowElRef = useRef( null );

  const getIsNextButtonDisables = () => {
    if ( blockName === BlockNames.REVIEWS ) setIsNextDisabled( itemsCount <= 1 );
    if ( blockName === BlockNames.ARTICLES ) {
      if ( width >= 1184 ) setIsNextDisabled( itemsCount <= 3 );
      if ( width < 1184 ) setIsNextDisabled( itemsCount <= 2 );
    }
    if ( blockName === BlockNames.PRODUCTS ) {
      if ( width >= 1184 ) setIsNextDisabled( itemsCount <= 4 );
      if ( width < 1184 && width >= 944 ) setIsNextDisabled( itemsCount <= 3 );
      if ( width < 944 ) setIsNextDisabled( itemsCount <= 2 );
    }
  };
  const getPagesCount = () => {
    if ( blockName === BlockNames.REVIEWS ) return itemsCount;
    if ( blockName === BlockNames.ARTICLES ) {
      if ( width >= 940 ) return itemsCount / 3;
      if ( width < 940 && width >= 700 ) return itemsCount / 2;
      if ( width < 700 && width >= 520 ) return itemsCount / ( 1 + ( ( width - ( 280 + ( width * 0.05 ) ) ) / 280 ) );
      return itemsCount / ( 1 + ( ( width - ( 280 + ( width * 0.04 ) ) ) / 280 ) );
    }
    if ( blockName === BlockNames.PRODUCTS ) {
      if ( width > 944 ) return itemsCount / ProductsCount.widthMore940 - 0.012;
      if ( width <= 944 && width > 704 ) return itemsCount / ProductsCount.width940_700 - 0.012;
      if ( width <= 704 && width > 524 ) return itemsCount / ProductsCount.width700_520 - 0.028;
      if ( width <= 524 && width > 404 ) return ( ( ProductCardWidth.WidthLess704 * itemsCount ) + ( ProductListGap.Width524_404 * ( itemsCount - 1 ) ) + ( width * 0.02 ) ) / width;
      else return ( ( ProductCardWidth.WidthLess704 * itemsCount ) + ( ProductListGap.WidthLess404 * ( itemsCount - 1 ) ) ) / width;
    }
    if ( blockName === BlockNames.ANIMALS ) {
      if(itemsCount > 5){
        if ( width >= 940 ) return 1;
        if ( width < 940 && width >= 700 ) return itemsCount / ( width / ( AnimalCardWidth.width940_700__6items + AnimalListGap.width940_700 ) );
        else return itemsCount / ( width / ( AnimalCardWidth.widthLess700__6items + AnimalListGap.widthLess700__6items ) );
      } else {
        if ( width >= 940 ) return 1;
        if ( width < 940 && width >= 700 ) return itemsCount / ( width / ( AnimalCardWidth.width940_700 + AnimalListGap.width940_700 ) );
        else return itemsCount / ( width / ( AnimalCardWidth.widthLess700 + AnimalListGap.widthLess700 ) );
      }
    }
    return 1;
  };
  const pagesCount = getPagesCount();
  const onPrevSectionButtonClick = () => {
    setOffset( ( currentOffset ) => {
      const newOffset = currentOffset + width;
      setIsNextDisabled( false );
      setIsPrevDisabled( blockName === BlockNames.REVIEWS ? 0 < newOffset + width : 0 < newOffset );
      return Math.min( newOffset, 0 );
    } );
  };
  const onNextSectionButtonClick = () => {
    setOffset( ( currentOffset ) => {
      const newOffset = currentOffset - width;
      const maxOffset = -( width * ( pagesCount - 1 ) );
      setIsNextDisabled( blockName === BlockNames.REVIEWS ? maxOffset > newOffset - width : maxOffset > newOffset );
      setIsPrevDisabled( false );
      return Math.max( newOffset, maxOffset );
    } );
  };
  const onTouchStart = ( event: any ) => {
    setX( event.touches[ 0 ].clientX );
  };
  const getDiff = () => {
    if ( blockName === BlockNames.PRODUCTS ) {
      if ( width >= 704 ) return width - ( width * 0.004 );
      if ( width < 704 && width >= 524 ) return width + ( width * 0.007 );
      if ( width < 524 && width >= 404 ) return ProductCardWidth.WidthLess704 + ProductListGap.Width524_404 - ( width * 0.007 );
      if ( width < 404 ) return ProductCardWidth.WidthLess704 + ( width * 0.071 );
      return width;
    }
    if ( blockName === BlockNames.ARTICLES ) {
      if ( width >= 700 ) return width;
      else return 280 + ( width * 0.03 );
    }
    if ( blockName === BlockNames.ANIMALS ) {
      if ( itemsCount > 5 ) {
        if ( width >= 940 ) return width;
        if ( width < 940 && width >= 704 ) return AnimalCardWidth.width940_700__6items + AnimalListGap.width940_700;
        else return AnimalCardWidth.widthLess700__6items + AnimalListGap.widthLess700;
      } else {
        if ( width >= 940 ) return width;
        if ( width < 940 && width >= 704 ) return AnimalCardWidth.width940_700 + AnimalListGap.width940_700;
        else return AnimalCardWidth.widthLess700 + AnimalListGap.widthLess700;
      }
    } else return width;
  };
  const onTouchEnd = ( event: any ) => {
    if ( !x ) return false;
    else {
      const x2 = event.changedTouches[ 0 ].clientX;
      setX2( x2 );
      if ( x && x2 ) {
        if ( x2 - x < 0 && Math.abs( x2 - x ) > 10 ) {
          setOffset( ( currentOffset ) => {
            const newOffset = currentOffset - getDiff();
            const maxOffset = -( width * ( pagesCount - 1 ) );
            return Math.max( newOffset, maxOffset );
          } );
        }
        if ( x2 - x > 0 && Math.abs( x2 - x ) > 54 ) {
          setOffset( ( currentOffset ) => {
            const newOffset = currentOffset + getDiff();
            return Math.min( newOffset, 0 );
          } );
        }
      }
    }
  };

  useEffect( () => {
    const resizeHandler = () => {
      // @ts-ignore
      const _width = windowElRef?.current.offsetWidth;
      setWidth( _width );
      setOffset( 0 );
      getIsNextButtonDisables();
    };
    resizeHandler();
    window.addEventListener( 'resize', resizeHandler );

    return () => {
      window.removeEventListener( 'resize', resizeHandler );
    };
  }, [ width, itemsCount ] );

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
