const db = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

db.post('/', (req, res) => {
  readFromFile('.db/db.json').then((data) => res.json(JSON.parse(data)))
})

db.post('/', (req, res) => {
  console.log(req.body);

  const { username, topic, tip } = req.body;

  if (req.body) {
    const newDb = {
      username,
      tip,
      topic,
      tip_id: uuidv4(),
    };

    readAndAppend(newDb, './db/tips.json');
    res.json(`db added successfully 🚀`);
  } else {
    res.errored('Error in adding tip');
  }


})

// GET Route for retrieving 
db.get('/', (req, res) => {
  readFromFile('./db/tips.json').then((data) => res.json(JSON.parse(data)));
});



module.exports = db;