import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

import './config/ReactotronConfig';

import GlobalStyle from './styles/global';

import { store, persistor } from './store';

import Routes from './routes';
import history from './services/history';

export default function src() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Routes />
          <GlobalStyle />
          <ToastContainer autoClose={3000} />
        </Router>
      </PersistGate>
    </Provider>
  );
}
