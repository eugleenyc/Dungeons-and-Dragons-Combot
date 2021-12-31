/**
 * ************************************
 *
 * @module  actions.js
 * @author
 * @date
 * @description Action Creators
 *
 * ************************************
 */

// import actionType constants
import * as types from '../constants/actionTypes.jsx';

//updates
export const updateResponse = responseObj => {
  return ({
    type:types.UPDATE_RESPONSE,
    payload: responseObj,
  })
}

export const reset = () => {
  return ({
    type:types.RESET,
    payload: ''
  })
}