import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import AppWithRouter from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import rootReducer from './redux/rootReducer'

let store = createStore(rootReducer, applyMiddleware(thunk))


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <AppWithRouter />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

