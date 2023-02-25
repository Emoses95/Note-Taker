// Imported dependencies
const express= require('express');
const path= require('path');
const fs= require('fs');
const {v4: uuidv4}= require('uuid');

const PORT= process.env.PORT || 3000
const app= express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

// Get route for index.html
app.get("/",(req,res)=>{
    console.log(__dirname)
    res.senfFile(path.join(_dirname,"public/index.html"))

})
// Get route index.html
app.get("/notes",(req,res)=>{
    res.sendFile(path.join(__dirname,'public/notes.html'))
})

// Get route for notes.html
app.get('/api/notes', (req,res)=>{
    res.sendFile(path.join(_dirname,"db/db.json"))
})

// Get route for api/notes
app.post("/api/notes", (req, res) => {
    let newText= req.body;
    let textList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    
    newText.id = Math.floor(Math.random() * 10000);
   
    textList.push(newText);
    fs.writeFileSync("./db/db.json", JSON.stringify(textList));
    res.json(textList);
})

// Delete route
app.delete('/api/notes/:id', (req, res) => {
    const uniqueID = req.params.id;
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
      if (err) {
        console.log(err)
      } 
      const note= JSON.parse(data)
      const filterNote= note.filter(function(note) {
        return note.id !== uniqueID
      })
      fs.writeFile('./db/db.json', JSON.stringify(filterNote), err => console.log(err))
    })
    res.json({ok:true})
  })
app.listen(PORT, () => {
    console.log(`Server listening in on http://localhost:${PORT}`)
})