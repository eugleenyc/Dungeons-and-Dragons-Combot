/**
 * ************************************
 *
 * @module  store.js
 * @author
 * @date
 * @description Redux 'single source of truth'
 *
 * ************************************
 */

import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers/index.js';

// we are adding composeWithDevTools here to get easy access to the Redux dev tools
const store = createStore(
  reducers,
  composeWithDevTools()
);

export default store;

//actions to handle clicks and how they change the state
//reducers reflect our actions
//pass props/dispatch to our components
//handle click/react stuff 
