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
  console.log(req.body);
  res.status(200).send(`got a GET for ${req.query}`);
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
  