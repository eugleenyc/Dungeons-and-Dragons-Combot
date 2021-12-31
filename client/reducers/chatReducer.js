import * as types from '../constants/actionTypes.jsx';

const initialState = {
    queryResponse: '',
    count: 0,
    monster: {},    
    mosnterList: [],
  };

  const ChatReducer = (state = initialState, action) => {
    const newState = {...state};
    switch (action.type) {
        case types.UPDATE_RESPONSE : {
            // console.log(action.payload);
            newState.queryResponse = action.payload.reply;
            //if count is 1, set valid monster and monster and clear validmonsterlist and monsterlist
            if (action.payload.count === 0) {
                newState.queryResponse = 'No monsters found';
                newState.count = 0;
                newState.monster = {};
                newState.monsterList = [];
            }
            if (action.payload.count === 1) {
                // console.log('single monster');
                newState.count = 1;
                newState.monster = action.payload.list[0];
                newState.monsterList = [];
            }
            //else the opposite
            else if (action.payload.count > 1) {
                // console.log('monster list');
                newState.count = action.payload.count;
                newState.monster = {};
                newState.monsterList = action.payload.list;
            }

            return newState;
        }
        case types.RESET : {
            console.log('resetting...');
            return {...initialState};
        }
        default: {
            return state;
        }
    }
}

export default ChatReducer;