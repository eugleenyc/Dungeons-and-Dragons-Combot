import fetch from 'cross-fetch';

const api_URL = 'https://api.open5e.com/monsters/';

const dnd5eapi = (num) => {
  fetch(api_URL.concat(`?challenge_rating=${num}`))
    .then(response => response.json())
    .then(response => console.log(response))
    .catch((error) => console.log(error));
};

export default dnd5eapi;