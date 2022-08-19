import Header from './components/Header/Header';
import AppRoutes from './routes/routes';
import Footer from './components/Footer/Footer';
import React, { Suspense, useCallback, useEffect, useState } from 'react';
import HeaderBurger from './components/Header/HeaderBurger/HeaderBurger';
import FooterBurger from './components/Footer/FooterBurger/FooterBurger';
import { Wrapper } from './components/common/Wrapper/Wrapper';
import Loading from './components/common/Loading/Loading';
import { useResize } from './customHooks/useResize';
import { fetchDiscountForBasketTC } from './redux/reducers/discountForBasket';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './redux/store';

const App = () => {

  const [ editMode, setEditMode ] = useState<boolean>( false );
  const [ forFilters, setForFilters ] = useState<boolean>( false );
  const dispatch = useDispatch<AppDispatch>();

  const openFiltersMode = useCallback( () => {
    setEditMode( true );
    setForFilters( true );
  }, [] );
  const closeEditMode = useCallback( () => {
    setEditMode( false );
    setForFilters( false );
  }, [] );
  const openEditMode = useCallback( () => {
    setEditMode( true );
  }, [] );
  const { windowElRef, width } = useResize();
  useEffect( () => {
    if ( width <= 770 ) setEditMode( false );
  }, [ width ] );
  useEffect( () => {
    dispatch( fetchDiscountForBasketTC() );
  }, [ dispatch ] );

  return (
    <div ref={ windowElRef }>
      { editMode
        ? ( <div>
          <Suspense fallback={ <Loading/> }>
            <Wrapper>
              <HeaderBurger onClickHandler={ closeEditMode } forFilters={ forFilters }/>
              <FooterBurger/>
            </Wrapper>
          </Suspense>
        </div> )
        : ( <>
          <Suspense fallback={ <Loading/> }>
            <Wrapper>
              <Header openEditMode={ openEditMode }
                      closeEditMode={ closeEditMode }/>
              <AppRoutes openFiltersMode={ openFiltersMode } closeEditMode={ closeEditMode }/>
              <Footer/>
            </Wrapper>
          </Suspense>
        </> )
      }
    </div>
  );
};

export default App;
