import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Store from '../store.js';
import * as Actions from '../actions/actions.js';


const dialogFlowComponent = props => {
  //creates a state of the number of cards in market
  const [cards, setCards] = useState(0);  
  //calculates percentage
  const percentOfTotal = (Math.floor(Number(cards) / Number(props.totalCards) * 100) || 0) + '%';
    
  const changeCards = (num) => {
    if (num > 0) {
      setCards(cards + num);
      props.addCard();
    }
    else {
      if (cards === 0) return;
      setCards(cards + num);
      props.deleteCard();
    }
  };
  
  return(
    <div className="marketBox">
      <h5>Market ID: {props.marketId}</h5>
      <h5>Location: {props.location}</h5>
      <h5>Cards: {cards} </h5>
      <h5>% of Total: {percentOfTotal}</h5>
      <button className="addCard" onClick={() => changeCards(1)}>Add Card</button>
      <button className="deleteCard" onClick={() => changeCards(-1)}>Delete Card</button>
    </div>
  );
};
export default dialogFlowComponent;