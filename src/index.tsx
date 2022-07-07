import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';
import { HashRouter } from 'react-router-dom';
import './index.scss';
import { Provider } from 'react-redux';
import store, { persistor } from './redux/store';

const root = ReactDOM.createRoot(
  document.getElementById( 'root' ) as HTMLElement,
);
root.render(
  <Provider store={ store }>
    <PersistGate loading={ null } persistor={ persistor }>
      <HashRouter basename={ '/' }>
        <App/>
      </HashRouter>
    </PersistGate>
  </Provider>,
);

