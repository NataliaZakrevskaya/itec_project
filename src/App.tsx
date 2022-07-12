import Header from './components/Header/Header';
import AppRoutes from './routes/routes';
import Footer from './components/Footer/Footer';
import { useState } from 'react';
import HeaderBurger from './components/Header/HeaderBurger/HeaderBurger';
import FooterBurger from './components/Footer/FooterBurger/FooterBurger';

const App = () => {

  const [ editMode, setEditMode ] = useState<boolean>( false );

  const closeEditMode = () => {
    setEditMode( false );
  };
  const openEditMode = () => {
    setEditMode( true );
  };

  return (
    <>
      { editMode
        ? ( <div>
          <HeaderBurger onClickHandler={closeEditMode}/>
          <FooterBurger/>
        </div> )
        : ( <>
          <Header openEditMode={openEditMode}
                  closeEditMode={closeEditMode}/>
          <AppRoutes/>
          <Footer/>
        </> )
      }
    </>
  );
};

export default App;
