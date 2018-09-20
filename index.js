const express = require('express');
const mongoose = require('mongoose');
const app = express();
const keys = require('./config/keys');
require('./models/user');
const User = mongoose.model('User');
const bodyParser = require('body-parser');
const multer = require("multer");
const fs = require("fs");

// multer accepts options object, wghich allows one to 
const upload = multer({dest: "uploads/"});

// the upload needs to be the same exact name as the key value in form data
// also the reason why it needs to be formdata is probably because multer 
// needed to parse the file hence why the html
// formdata.append("file", fileObject) === <input name="file">
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

// plan, add the img property to user. Figure out how to use middleware

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
 

// what middleware does is parse the request, and then attach fields to that request. For example jsonParser will contain req.body,
// multer will have req.file. 


// an interesting note is that when you send a response, it must be in the form of an object literal
// what is middleware? req.file is undefined which could mean that 
// how to get file path multer

// goal, collect username under req.body, perhaps using form upload?
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

// try just calling updateBook for now
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
    // This approach involves first retrieving the document from Mongo, then issuing an update command (triggered by calling save). However, if we don't need the document returned in our application and merely want to update a property in the database directly, Model#update is right for us:

    // console.log("WOW?!")
    // const newRecipe = 
    // [  
    //     {              
    //         genre: 'entrees', 
    //         recipes: 
    //         [
    //             { 
    //                 title: 'Oven-Roasted Garlic Chicken', 
    //                 ingredients: ['Chicken', 'garlic'], 
    //                 steps: ['Stick in oven', 'wait 30 minutes ']
    //             } 
    //         ]
    //     }
    // ] 

    console.log(req.body)

    User.findOne({username: req.body.username}, (err, user) => {
        console.log("Updatebook was called")
        if (err){
            console.log("ERROR at updatebook, ")    
            res.send({no: "dice"})
        } else {

            user.set({recipeBook: req.body.recipeBook})

            user.save( (err, updatedUser) => {
                if (err) {
                    console.log("Error at user.save at app.post(/updatebook) ")
                    console.log(err)
                    res.send(err)
                } else {
                    res.send(updatedUser)
                }
            } )
        }
    }) 
})


// TODO: Examine why this actually isn't being called in the SPA. TYPO, THAT'S THE REASON WHY
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
    // when creating, do we have to do username.type?
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