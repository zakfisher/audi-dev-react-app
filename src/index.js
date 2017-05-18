import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {renderRoutes} from 'react-router-config';
import {BrowserRouter} from 'react-router-dom';
import Data from './helpers/data';
import routes from './routes';
import store from './redux/store';
import './index.sass';

/**
  Client-side entry point
  ---
  ./src/index.js

  In this class we:
  - call `ReactDOM.render()` on the client
  - allow client-side routing with React Router
  - pass in our Redux data store
*/

Data.fetch();

// Render
ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      {renderRoutes(routes)}
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));
