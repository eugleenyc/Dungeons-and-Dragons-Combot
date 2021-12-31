
import React, {useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../actions/actions';
import fetch from 'cross-fetch';
import * as types from '../constants/actionTypes.jsx';


const ChatComponent = () => {

  const updateResponseDispatch = useDispatch(Actions.updateResponse);
  const updateResponse = useDispatch();

  //sets up event listener for keypress
  useEffect(() => {
    //When the state changes, it will create the event listener
    window.addEventListener('keydown', downHandler);
  
    //THIS IS NEEDED TO PREVENT MEMORY LEAKS. When the page is removed, it needs to remove/return the event listener as well
    return () => {
      window.removeEventListener('keydown', downHandler);
    };
  });
  
  //if enter is pressed, send query
  const downHandler = ({key}) => {
    if (key === 'Enter') sendQuery();
  };
  
  //if button is pressed, send query
  const buttonClicked = (e) => {
    sendQuery();
  };
  
  const sendQuery = () => {
    const queryString = document.getElementById('query').value;
    if (queryString === '') return;
    document.getElementById('query').value = '';
    // console.log(queryString);
    fetch('/api', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'query': queryString})
    })
      .then(response => response.json())
      .then(response => {
        // console.log(response);
        //WHY DOESN'T MY ACTIONS DISPATCHER WORK???
        // updateResponseDispatch(response);
        updateResponse({type:types.UPDATE_RESPONSE, payload: response})
      })
      .catch((err) => console.log(err));
  
  };
  
  return (
    <div>
      <input type="text" id="query" size={100}></input><input type="button" id="submit" value="CHAT" onClick = {(e) => buttonClicked(e)}></input>
    </div>
  );
};

export default ChatComponent;