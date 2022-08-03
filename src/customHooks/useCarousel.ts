import { useEffect, useRef, useState } from 'react';
import { BlockNames } from './enums';

export const useCarousel = ( blockName: BlockNameType, itemsCount: number ) => {
  const [ offset, setOffset ] = useState( 0 );
  const [ isNextDisabled, setIsNextDisabled ] = useState( false );
  const [ isPrevDisabled, setIsPrevDisabled ] = useState( true );
  const [ width, setWidth ] = useState( 1200 );

  const windowElRef = useRef( null );

  useEffect( () => {
    const resizeHandler = () => {
      // @ts-ignore
      const _width = windowElRef?.current.offsetWidth;
      setWidth( _width );
    };
    resizeHandler();
    window.addEventListener( 'resize', resizeHandler );

    return () => {
      window.removeEventListener( 'resize', resizeHandler );
    };
  }, [ width ] );

  const getPagesCount = ( blockName: BlockNameType, itemsCount: number ) => {
    if ( blockName === BlockNames.REVIEWS ) return itemsCount;
    if ( blockName === BlockNames.ARTICLES ) {
      if ( width > 940 ) return itemsCount / 3;
      if ( width < 941 && width > 700 ) return itemsCount / 2;
      return itemsCount;
    }
    if ( blockName === BlockNames.PRODUCTS ) {
      if ( width > 940 ) return itemsCount / 4;
      if ( width < 941 && width > 700 ) return itemsCount / 3;
      if ( width < 701 && width >= 520) return itemsCount / 2;
      if ( width < 520 && width > 400) return 3120 / width;
      else return 3200 / width
    }
    if ( blockName === BlockNames.ANIMALS ) {
      if ( width > 680 ) return 0;
      if ( width < 681 && width > 500 ) return itemsCount / 14.29;
      if ( width < 501 && width > 400 ) return itemsCount / 16.67;
      if ( width < 401 && width > 350 ) return itemsCount / 12.82;
      if ( width < 351 ) return itemsCount / 11.81;
    }
    return 1;
  };

  const pagesCount = getPagesCount( blockName, itemsCount );

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
    if(width >= 520) return width
    if(width < 520 && width > 400 ) return 239 + (width * 0.04)
    if(width <= 400 ) return 239 + (width * 0.071)
    return width
  }
  const onTouchEnd = ( event: any ) => {
    if ( !x ) return false;
    setX2( event.changedTouches[ 0 ].clientX );
    if ( x && x2 ) {
      if ( x2 - x < 0 ) {
        setOffset( ( currentOffset ) => {
          const nextDiff = getDiff();
          const newOffset = currentOffset - nextDiff;
          const maxOffset = -( width * ( pagesCount - 1 ) );
          return Math.max( newOffset, maxOffset );
        } );
      }
      if ( x2 - x > 0 ) {
        setOffset( ( currentOffset ) => {
          const prevOffset = getDiff()
          const newOffset = currentOffset + prevOffset;
          return Math.min( newOffset, 0 );
        } );
      }
    }
  };
  const onTouchMove = ( event: any ) => {
    if ( !x ) return false;
    setX2( event.touches[ 0 ].clientX );
    if ( x && x2 ) {
      if ( x2 - x < 0 ) {
        setOffset( ( currentOffset ) => {
          const nextDiff = Math.abs( x2 - x );
          const newOffset = currentOffset - nextDiff;
          const maxOffset = -( width * (pagesCount - 1) );
          return Math.max( newOffset, maxOffset );
        } );
      }
      if ( x2 - x > 0 ) {
        setOffset( ( currentOffset ) => {
          const prevDiff = x2 - x;
          const newOffset = currentOffset + prevDiff;
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
    onTouchMove,
    width,
  };
};

type BlockNameType = 'reviews' | 'products' | 'articles' | 'animals'