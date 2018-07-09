const express = require('express') 
const mongoose = require('mongoose')
const app = express()
const keys = require('./config/keys')
require('./models/user')
const User = mongoose.model('User')



mongoose.connect(keys.mongoURI)

handleError = (err) => {

    console.log("Wow, what happened?")

}


app.get('/', (req, res) => {
    res.send({hi: 'there'}) 
})
 

app.post('/login', (req, res) => { 

    console.log(req.body)
    
    let userN = User.findOne({ username: "eric", password: "theUsual" }, (err, doc) => { 

        console.log(doc)

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