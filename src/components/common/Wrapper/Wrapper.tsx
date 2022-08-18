import { useLocation } from 'react-router-dom';
import { ReactElement, useLayoutEffect } from 'react';

export const Wrapper = ( { children }: any ): ReactElement => {
  const location = useLocation();
  useLayoutEffect( () => {
    document.documentElement.scrollTo( 0, 0 );
  }, [ location.pathname ] );
  return children;
};