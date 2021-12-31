import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Store from '../store.js';

export const counterComponent = ({value}) => {
    const dispatch = useDispatch();
}

const MonsterContainer = () => {

    // REDUX STATE HOOKS
    const monsterCount = useSelector((state) => (state.chat.count));
    const monster = useSelector((state) => state.chat.monster);
    const monsterList = useSelector((state) => state.chat.monsterList);

    //REDUX DISPATCH HOOKS
    
    // const validMonster = false;
    // const validMonsterList = false;

    //returns different things depending on state
    //if state for Monster is false and Monster List is false, return empty
    //if state for monsterList is valid return list
    //if state for monster is valid return specific
    //if both are valid, show error


    //create display based on what was stored in state;
    const display = [];
    if (monsterCount === 0) display.push('Talk to the comBOT to look for stuff...');
    else if (monsterCount === 1) {
        display.push('Look for the single monster in the console...');
        console.log(monster);
    }
    else {
        let count = 1;
        let id = 0;
        display.push(<p>I found {monsterCount} monsters</p>);
        for (const queryMonster of monsterList) {
            // console.log(queryMonster)
            let monsterName = queryMonster.name;
            let monsterAlignment = queryMonster.alignment;
            let monsterType = queryMonster.type + ', ' +queryMonster.subtype;
            let monsterCR = queryMonster.challenge_rating;
            let monsterAC = queryMonster.armor_class
            if (queryMonster.armor_desc !== null) monsterAC += ' ' + queryMonster.armor_desc;
            let monsterHD = queryMonster.hit_dice;
            display.push(<li key={id.toString()}>{count} - {monsterName} ({monsterAlignment}) Type: {monsterType} CR: {monsterCR} AC: {monsterAC} HP: {monsterHD}</li>);
            count++;
            id++;
        };
    };

    return (
    <div className="container">
        {display}
    </div>
  );
};
  
export default MonsterContainer;