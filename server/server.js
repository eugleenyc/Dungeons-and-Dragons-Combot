import {dirname } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import fs from 'fs';
import dialogFlowController from './controllers/dialogFlowController.js';
import dnd5eapiController from './controllers/dnd5eapiController.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

// const apiRouter = require('./routes/api');

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//static files
app.use(express.static(path.resolve(__dirname, '../client')));


//start writing route handlers here
app.use('/api', dialogFlowController.sendQuery, dnd5eapiController.getList, (req, res) => {
  //spreads and stores all queryobjs in app.locals.queryObjs again
  app.locals.queryObjs = res.locals.dnd5eapiQuery;

  //stores the monster list so it can be used to parse out waht you want.
  if (!res.locals.validQuery && !res.locals.specificQuery) {
    console.log('No valid query...\n\n');
    res.status(200).json({'reply': res.locals.fulfillmentText});
  }
  app.locals.monsterList = res.locals.monsterList;
  app.locals.validQuery = res.locals.validQuery;
  console.log('\n\nfinished and returning response...\n\n');
  res.status(200).json({'reply': res.locals.fulfillmentText, 'count': res.locals.monsterList.count, 'list':res.locals.monsterList.results});
});

app.use('/', (req, res) => {
  res.status(200).send(`got a GET for ${req.query}`);
});



// catch-all route handler for any requests to an unknown route
app.use('/:address', (req, res) => {
  console.log(req.params.address);
  res.status(404).send(`Nothing here at ${req.params.address}`);
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});
  
/**
   * start server
   */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});
  
export default app;
  