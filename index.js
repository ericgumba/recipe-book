const express = require('express') 
const mongoose = require('mongoose')
const app = express()
const keys = require('./config/keys')
require('./models/user')
const User = mongoose.model('User')
const bodyParser = require('body-parser')


mongoose.connect(keys.mongoURI)

const jsonParser = bodyParser.json()
const urlEncodedParser = bodyParser.urlencoded({extended: false})
handleError = (err) => {

    console.log("Wow, what happened?")

}


app.get('/', (req, res) => {
    res.send({hi: 'there'}) 
})
 

app.post('/login', jsonParser, (req, res) => { 

    console.log(req.body)

    console.log(req.body.username)
    
    let userN = User.findOne({ username: req.body.username, password: req.body.password }, (err, doc) => { 

        // console.log(doc)

        res.send({username: doc.username, password: doc.passsword, recipeBook: doc.recipeBook })
    } )
 

} )

app.post('./updatebook', (req, res) => {

})

app.post('./newuser', (req, res) => {
    const recipeBook = 
    [  
        {              
            genre: 'entrees', 
            recipes: 
            [
                { 
                    title: 'Oven-Roasted Garlic Chicken', 
                    ingredients: ['Chicken', 'garlic'], 
                    steps: ['Stick in oven', 'wait 30 minutes ']
                }
            ]
        }
    ]  
    User.create({username: req.body.username, password: req.body.password, recipeBook})
})

 


const port = process.env.PORT || 5000;

app.listen(port)