import Header from './components/Header/Header';
import AppRoutes from './routes/routes';
import Footer from './components/Footer/Footer';
import { useState } from 'react';
import HeaderBurger from './components/Header/HeaderBurger/HeaderBurger';
import FooterBurger from './components/Footer/FooterBurger/FooterBurger';

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
          <HeaderBurger onClickHandler={ closeEditMode } forFilters={ forFilters }/>
          <FooterBurger/>
        </div> )
        : ( <>
          <Header openEditMode={ openEditMode }
                  closeEditMode={ closeEditMode }/>
          <AppRoutes openFiltersMode={ openFiltersMode } closeEditMode={closeEditMode}/>
          <Footer/>
        </> )
      }
    </>
  );
};

export default App;
