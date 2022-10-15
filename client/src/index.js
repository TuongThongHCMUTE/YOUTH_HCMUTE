import React from 'react';
// Node Modules ============================================================ //
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
// Styles ================================================================== //
import './assets/scss/style.scss';
import './assets/css/colors.css';
import './assets/css/components.css';
// Store
import store from './redux/store';
// Components ============================================================== //
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

