import React, { useState, useEffect } from 'react';
import fetch from 'cross-fetch';

const App = () => {

  const[monster, setMonster] = useState();

  useEffect(() => {
    const api_URL = 'https://api.open5e.com/monsters/';

    fetch(api_URL)
      .then(response => response.json())
      .then(response => {
        setMonster(response);
        console.log(response);
      })
      .catch((error) => console.log(error));
  }
    
    
  );
  return (
    <div>
      {monster}
    </div>
  );
};

export default App;
