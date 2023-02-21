// Imported dependencies
const express= require('express');
const path= require('path');
const fs= require('fs');

const app= express()

const PORT= process.env.PORT || 3000

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// routes

app.get("/",(req,res)=>{
    console.log(__dirname)
    res.senfFile(path.join(_dirname,"public/index.html"))

})

app.get("/notes",(req,res)=>{
    res.sendFile(path.join(__dirname,'public/notes.html'))
})

app.get('/api/notes', (req,res)=>{
    res.sendFile(path.join(_dirname,"db/db.json"))
})

app.post("/api/notes", (req, res) => {
    let newText= req.body;
    let textList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    
    newText.id = Math.floor(Math.random() * 10000);
   
    textList.push(newText);
    fs.writeFileSync("./db/db.json", JSON.stringify(textList));
    res.json(textList);
})

app.listen(PORT, () => {
    console.log(`Server listening in on http://localhost:${PORT}`)
})