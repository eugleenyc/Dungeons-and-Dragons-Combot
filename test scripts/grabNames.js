import fetch from 'cross-fetch';
import fs from 'fs';

const api_URL = 'https://api.open5e.com/monsters/';

for (let i = 1; i < 23; i++) {
  fetch(api_URL.concat(`?page=${i}`))
    .then(response => response.json())
    .then(response => {
    //   console.log(response.results);
      for (const monster of response.results) {
        fs.appendFile('test.txt',
          `{
            "value": "${monster.name}",
            "synonyms": [
            "${monster.name}"
            ]
            },
            `, {encoding: 'utf-8'}, (err) => {
            if (err) console.log(err);
            else {
              console.log(`Writing ${monster.name}`);
            }
          });
      }
    })
    .catch((error) => console.log(error));
}