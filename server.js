'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const {getClientList, getClient, addClient, deleteClient} = require('./handlers/clientHandlers');
const {getWordById, getRandomWordInfo, verifyGuess} = require('./handlers/hangmanHandlers');

express()
  .use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  .use(morgan('tiny'))
  .use(express.static('public'))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))

  // endpoints

  // get word by id
  .get('/hangman/word/:id', getWordById)

  // get id and letterCount of random word
  .get('/hangman/word', getRandomWordInfo)

  // guessing
  .get('/hangman/guess/:id/:letter', verifyGuess)

  // get list of all clients
  .get('/allClients', getClientList)

  // get client based on id
  .get('/getClient/:id', getClient)

  // add new client
  .post('/addClient/:name/:age/:gender/:company/:email/:phone/:address', addClient)

  // DELETE client
  .delete('/deleteClient/:id', deleteClient)

  .listen(8000, () => console.log(`Listening on port 8000`));

  /**
   {
    id: '59761c23b30d971669fb42ff',
    isActive: true,
    age: 36,
    name: 'Dunlap Hubbard',
    gender: 'male',
    company: 'CEDWARD',
    email: 'dunlaphubbard@cedward.com',
    phone: '+1 (890) 543-2508',
    address: '169 Rutledge Street, Konterra, Northern Mariana Islands, 8551',
  }
   */