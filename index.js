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

    console.log('/login was called ')
    console.log(req.body) 
    
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
 

} )

app.post('/updatebook', jsonParser, (req, res) => {

})


// TODO: Examine why this actually isn't being called in the SPA. TYPO, THAT'S THE REASON WHY
app.post('/newuser', jsonParser, (req, res) => {

    console.log('/newuser was called')
    


    console.log("What is going on??" + req.body)
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
                },
                {
                    title: 'pizza',
                    ingredients: ['cheese', 'bread'],
                    steps: ['stick in oven', 'wait 30 minutes ']
                }
            ]
        }
    ] 
    // when creating, do we have to do username.type?
    User.create({username: req.body.username, password: req.body.password, recipeBook}, (err, doc) => {
        if(err){
            console.log('error found in /newuser')
            console.log(err) 
            res.status(400)
            res.send({msg: 'failure'})
        } else {
            res.send({msg: 'success'})
        }
    })
 
}) 

const port = process.env.PORT || 5000;

app.listen(port)