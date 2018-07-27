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


app.get('/identity', (req, res) => {
    
    const book = 
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