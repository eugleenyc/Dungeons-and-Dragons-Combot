import React, { useState, useEffect } from 'react';
import ChatComponent from './components/chatComponent.jsx';
import ChatHistoryContainer from './containers/chatHistoryContainer.jsx';
import MonsterContainer from './containers/monsterContainer.jsx';

const App = () => {
  return (
    <div>
      <h2 id='title'>D&D ComBOT Monster Lookup</h2>
      <ChatHistoryContainer/>
      <ChatComponent/>
      <MonsterContainer/>

    </div>
  );
};

export default App;
