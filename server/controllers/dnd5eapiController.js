import fetch from 'cross-fetch';

const api_URL = 'https://api.open5e.com/monsters/';
const dnd5eapiController = {};



dnd5eapiController.getList = (req,res,next) => {
  console.log(`running: dnd5eapiController.getList`);
  fetch(api_URL.concat(`?challenge_rating=${res.locals.dnd5eapiQuery.cr}`))
    .then(response => response.json())
    .then(response => console.log(response))
    .catch((error) => console.log(error));
};

export default dnd5eapiController;