import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxLogger from 'redux-logger';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import * as reducers from './redux/reducers';

import App from './App.js';
import * as serviceWorker from './serviceWorker';

import * as services from '../src/services';

const store = createStore(combineReducers(reducers), applyMiddleware(reduxLogger));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

services.logUser();