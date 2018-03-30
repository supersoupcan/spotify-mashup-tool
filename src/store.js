import {createStore, combineReducers, applyMiddleware} from 'redux';

import logger from 'redux-logger';
import thunk from 'redux-thunk';
import testData from '../testData.js';

import { authentication, discographies}  from './reducers';

export default createStore(
  combineReducers(
      { authentication, discographies}
  ),
  {
    authentication : {
      authenticated : false,
    },
    discographies : [{},{}]
  },
  applyMiddleware(thunk, logger)
);