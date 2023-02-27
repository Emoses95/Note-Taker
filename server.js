// Imported dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const PORT = process.env.PORT || 3000
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// Get route for index.html
app.get("/", (req, res) => {
  console.log(__dirname)
  res.sendFile(path.join(__dirname, "public/index.html"))

})
// Get route index.html
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'))
})

// GET route for notes.html
app.get('/api/notes', (req, res) => {
  const data = JSON.parse(fs.readFileSync('db/db.json'));
  res.json(data);
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  const id = uuidv4(); // Generate a unique ID for the new note
  newNote.id = id; // Add the ID to the new note object
  const db = require('./db.json');
  db.push(newNote);
  // Save the updated db.json file
  fs.writeFileSync('./db.json', JSON.stringify(db));
  res.status(201).json(newNote);
});

// Delete route
app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  let notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
  const index = notes.findIndex(note => note.id === id);
  if (index !== -1) {
    notes.splice(index, 1);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    res.status(200).json({ message: `Note with id ${id} deleted.` });
  } else {
    res.status(404).json({ message: `Note with id ${id} not found.` });
  }
});
app.listen(PORT, () => {
  console.log(`Server listening in on http://localhost:${PORT}`)
})