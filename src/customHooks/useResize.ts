import { useLayoutEffect, useState } from 'react';

export const useResize = ( windowElRef: any ) => {
  const [ width, setWidth ] = useState( 1200 );

  useLayoutEffect( () => {
    const resizeHandler = () => {
      if ( windowElRef.current ) {
        const _width = windowElRef?.current?.offsetWidth;
        setWidth( _width );
      }
    };
    resizeHandler();
    window.addEventListener( 'resize', resizeHandler );

    return () => {
      window.removeEventListener( 'resize', resizeHandler );
    };
  }, [ width ] );

  return { width };
};