const express = require('express');
const mongoose = require('mongoose');
const app = express();
const keys = require('./config/keys');
require('./models/user');
const User = mongoose.model('User');
const bodyParser = require('body-parser');
const multer = require("multer");
const fs = require("fs");
 
const upload = multer({dest: "uploads/"});  
const cpUpload = upload.single("file");


// possible use
app.use(express.static('uploads'));

// approach 1: send the file path to 
mongoose.connect(keys.mongoURI);
// upload.any

const jsonParser = bodyParser.json();
const urlEncodedParser = bodyParser.urlencoded({extended: false});

handleError = (err) => { 
    console.log("Wow, what happened?"); 
} 

app.get('/identity', (req, res) => {
    console.log("IDENTITY");
    const book = 
    [  
        {              
            genre: 'entrees', 
            recipes: 
            [
                { 
                    title: 'Oven-Roasted Garlic Chicken', 
                    ingredients: ['Chicken', 'garlic'], 
                    steps: ['Stick in oven', 'wait 30 minutes '],
                    image: ""
                    
                } 
            ]
        }
    ] 

    User.create({ username: "", password: "", recipeBook: book }, (err, doc) => {
        if(err){
            console.log('error found in /identity')
            console.log(err) 
            res.status(400)
            res.send({msg: 'failure'})
        } else {
            res.send({msg: 'success'})
        }
    })

})  
app.post("/upload", cpUpload, (req, res, next) => {
    console.log("app.post /upload");
    console.log(req.file.path); 

    const host = req.hostname;
    let filePath = req.protocol + "://" + host + ':5000/' + req.file.filename; // IMPORTANT, WE GET RID OF 5000 AFTER UPDATE.
    if (process.env.PORT){
        filePath = req.protocol + "://" + host + req.file.filename
    }
    console.log(host);
    console.log("file path es");
    console.log(filePath);
    res.send({msg:filePath});

}); 
app.post("savephoto", jsonParser, (req, res) => { 

})

app.post('/login', jsonParser, (req, res) => { 

    console.log('/login was called ')
    // console.log(req.body) 
    
    let userN = User.findOne({ username: req.body.username, password: req.body.password }, (err, doc) => { 
 

        if (doc){ 
            console.log("This was called found for some reason") 
            res.send({username: doc.username, password: doc.passsword, recipeBook: doc.recipeBook })
        } else {
            console.log(`error found in /login, ${err}`)
            res.status(400)
            res.send('None Shall Pass') 
        }
    } )
 

})

app.post('/updatebook', jsonParser, (req, res) => {  

    User.findOne({username: req.body.username}, (err, user) => { 
        if (err){ 
            res.send({no: "dice"})
        } else {

            user.set({recipeBook: req.body.recipeBook})

            user.save( (err, updatedUser) => {
                if (err) { 
                    res.send(err)
                } else {
                    res.send(updatedUser)
                }
            } )
        }
    }) 
})

 
app.post('/newuser', jsonParser, (req, res) => {

    console.log('/newuser was called')
     
    const recipeBook = 
    [  
        {              
            genre: 'entrees', 
            recipes: 
            [
                { 
                    title: 'Oven-Roasted Garlic Chicken', 
                    ingredients: ['Chicken', 'garlic'], 
                    steps: ['Stick in oven', 'wait 30 minutes '],
                    image: ""
                }
            ]
        }
    ];  
    User.create({username: req.body.username, password: req.body.password, recipeBook}, (err, doc) => {
        if(err){
            console.log('error found in /newuser');
            console.log(err); 
            res.status(400);
            res.send({msg: 'failure'});
        } else {
            res.send({username: req.body.username, recipeBook});
        }
    })
 
}) 

const port = process.env.PORT || 5000;

app.listen(port);
