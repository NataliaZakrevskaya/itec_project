import { useEffect, useRef, useState } from 'react';

export const useResize = () => {
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

  return { windowElRef, width };
}