import Header from './components/Header/Header';
import AppRoutes from './routes/routes';
import Footer from './components/Footer/Footer';
import React, { useState, Suspense } from 'react';
import HeaderBurger from './components/Header/HeaderBurger/HeaderBurger';
import FooterBurger from './components/Footer/FooterBurger/FooterBurger';
import { Wrapper } from './components/common/Wrapper/Wrapper';
import Loading from './components/common/Loading/Loading';

const App = () => {

  const [ editMode, setEditMode ] = useState<boolean>( false );
  const [ forFilters, setForFilters ] = useState<boolean>( false );

  const openFiltersMode = () => {
    setEditMode( true );
    setForFilters( true );
  };
  const closeEditMode = () => {
    setEditMode( false );
    setForFilters( false );
  };
  const openEditMode = () => {
    setEditMode( true );
  };

  return (
    <>
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
    </>
  );
};

export default App;
