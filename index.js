const express = require('express') 
const mongoose = require('mongoose')
const app = express()
const keys = require('./config/keys')
require('./models/user')
const User = mongoose.model('User')



mongoose.connect(keys.mongoURI)

handleError = (err) => {

    alert('wow what happened?')

}


app.get('/', (req, res) => {
    res.send({hi: 'there'})


})

app.get('/imreal', (req, res) => { 
    res.send({express: "Hello from express"})
} )


app.get('/login', (req, res) => {
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
    User.create({username: 'eric', password: 'theUsual', recipeBook}, (err, small) => {
        if(err) res.send("what happened?")
    } )
     
})


const port = process.env.PORT || 5000;

app.listen(port)