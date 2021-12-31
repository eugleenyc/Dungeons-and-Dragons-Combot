/**
 * ************************************
 *
 * @module  marketsReducer
 * @author
 * @date
 * @description reducer for market data
 *
 * ************************************
 */

import * as types from '../constants/actionTypes';

const initialState = {
  totalMarkets: 0,
  totalCards: 0,
  marketList: [],
  lastMarketId: 10000,
  newLocation: '',
};

const marketsReducer = (state = initialState, action) => {
  let marketList;
  switch (action.type) {
  case types.ADD_MARKET: {
    const lastMarketId = (state.lastMarketId) + 1;
    // increment lastMarketId and totalMarkets counters
    const totalMarkets = (state.totalMarkets) + 1;
    // create the new market object from provided data
    const newMarket = {
      // what goes in here?
      marketId: lastMarketId,
      location: state.newLocation
    };

    // push the new market onto a copy of the market list
    marketList = state.marketList.slice();
    marketList.push(newMarket);

    // return updated state
    return {
      ...state,
      marketList,
      lastMarketId,
      totalMarkets,
      newLocation: '',
    };

  }
  case types.SET_NEW_LOCATION: {
    return{
      ...state,
      newLocation: action.payload
    };
  }
    
  case types.ADD_CARD: {
    console.log('add_card');
    const newTotalCards = state.totalCards + 1;
    return{
      ...state,
      totalCards: newTotalCards
    };
  }
  case types.DELETE_CARD: {
    const newTotalCards = state.totalCards - 1;
    return{
      ...state,
      totalCards: newTotalCards
    };
  }
  default: {
    return state;
  }
  }
};

export default marketsReducer;
