import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Store from '../store.js';

const ChatHistoryContainer = () => {

    // REDUX STATE HOOKS
    // const validMonster = useSelector((state) => (state.monster.single));
    // const validMonsterList = useSelector((state) => (state.monster.list));
    //REDUX DISPATCH HOOKS
    
    const queryResponse = useSelector((state) => {
        return state.chat.queryResponse;
    });
    // console.log(queryResponse);
    //returns different things depending on state
    //if state for Monster is false and Monster List is false, return empty
    //if state for monsterList is valid return list
    //if state for monster is valid return specific
    //if both are valid, show error


    //create display based on what was stored in state;
    let display;
    if (!queryResponse) display = `Google DialogFlow hasn't responded yet. Talk to it below!`;
    else display = queryResponse;

    return (
    <div className="container">
        <p>{display}</p>
    </div>
  );
};
  
export default ChatHistoryContainer;