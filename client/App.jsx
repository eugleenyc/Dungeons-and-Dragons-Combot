import React, { useState, useEffect } from 'react';
import fetch from 'cross-fetch';

const App = () => {

  //sets up state for list
  const[monster, setMonster] = useState();

  //sets up event listener for keypress
  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    return() => {
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
    document.getElementById('query').value = '';
    console.log(queryString);
    fetch('/api', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'query': queryString})
    })
      .then(response => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.log(err));

  };

  return (
    <div>
      <input type="text" id="query" size={100}></input><input type="button" id="submit" value="CHAT" onClick = {(e) => buttonClicked(e)}></input>
    </div>
  );
};

export default App;
