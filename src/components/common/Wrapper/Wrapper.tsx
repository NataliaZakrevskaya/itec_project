import { useLocation } from 'react-router-dom';
import { useLayoutEffect } from 'react';

export const Wrapper = ({children}: any) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children
}