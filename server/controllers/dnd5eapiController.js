import fetch from 'cross-fetch';

const api_URL = 'https://api.open5e.com/monsters/';
const dnd5eapiController = {};


//gets the list using the query cr from res.locals.dnd5eapiquery
dnd5eapiController.getList = (req,res,next) => {
  if (!res.locals.specificQuery && (!res.locals.validQuery || res.locals.reset)) next();
  else {
    console.log('\n\nrunning: dnd5eapiController.getList');
    console.log(res.locals.dnd5eapiQuery);

    //setting up the fetch URL
    let fetchURL = api_URL;

    //if it's a specifi query, use that
    if (res.locals.specificQuery) {
      const key = Object.keys(res.locals.dnd5eapiQuery)[0];
      fetchURL += `?${key}=${res.locals.dnd5eapiQuery[key]}`;
      console.log(fetchURL);
    }
    //getting the last CR and type query and appending onto the fetch URL
    else {
      const crQuery = {};
      const typeQuery = {};
      const acQuery = {};
      for (const queryObj of res.locals.dnd5eapiQuery) {
        if (queryObj.hasOwnProperty('cr')) crQuery.cr = queryObj.cr;
        if (queryObj.hasOwnProperty('type')) typeQuery.type = queryObj.type; 
        if (queryObj.hasOwnProperty('ac')) acQuery.ac = queryObj.ac; 
      }
      console.log('crQuery', crQuery);
      console.log('typeQuery', typeQuery);
      console.log('acQuery', acQuery);

      //createing the fetch URL

      // if (crQuery.hasOwnProperty('cr')) fetchURL += (`?challenge_rating=${crQuery.cr}`);
      // if (typeQuery.hasOwnProperty('type')) {
      //   fetchURL === api_URL ? fetchURL += (`?type=${typeQuery.type}`) : fetchURL += (`&type=${typeQuery.type}`);
      // }
      // if (typeQuery.hasOwnProperty('ac')) {
      //   fetchURL === api_URL ? fetchURL += (`?armor_class=${typeQuery.ac}`) : fetchURL += (`&armor_class=${typeQuery.ac}`);
      // }
      fetchURL += `?limit=1086`;
      if (crQuery.hasOwnProperty('cr')) fetchURL += (`&challenge_rating=${crQuery.cr}`);
      if (typeQuery.hasOwnProperty('type')) fetchURL += (`&type=${typeQuery.type}`);
      if (acQuery.hasOwnProperty('ac')) fetchURL += (`&armor_class=${acQuery.ac}`);
      
    }
    console.log(fetchURL)
    fetch(fetchURL)
      .then(response => response.json())
      .then(response => {
      // console.log(response);

        //stores monsterList
        res.locals.monsterList = response;
        next();
      })
      .catch((error) => console.log(error));
  }
};

export default dnd5eapiController;