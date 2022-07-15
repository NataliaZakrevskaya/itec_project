import { useEffect, useRef, useState } from 'react';

export const useCarousel = ( pagesCount: number ) => {
  const [ offset, setOffset ] = useState( 0 );
  const [ width, setWidth ] = useState( 1200 );
  const [ isNextDisabled, setIsNextDisabled ] = useState( false );
  const [ isPrevDisabled, setIsPrevDisabled ] = useState( true );

  const windowElRef = useRef( null );

  useEffect( () => {
    const resizeHandler = () => {

      // @ts-ignore
      const _width = windowElRef?.current.offsetWidth;
      setWidth( _width );
      setOffset( 0 );
      setIsPrevDisabled( true );
      setIsNextDisabled( false );
    };
    resizeHandler();
    window.addEventListener( 'resize', resizeHandler );

    return () => {
      window.removeEventListener( 'resize', resizeHandler );
    };
  }, [ width ] );

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
  const onTouchMove = ( event: any ) => {
    if ( !x ) return false;
    setX2( event.changedTouches[ 0 ].clientX );
    if ( x && x2 ) {
      if ( x2 - x < 0 ) {
        setOffset( ( currentOffset ) => {
          const newOffset = currentOffset - width;
          const maxOffset = -( width * ( pagesCount - 1 ) );
          return Math.max( newOffset, maxOffset );
        } );
      }
      if ( x2 - x > 0 ) {
        setOffset( ( currentOffset ) => {
          const newOffset = currentOffset + width;
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
    onTouchMove,
  };
};