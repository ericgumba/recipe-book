const mongoose = require('mongoose')

const {Schema} = mongoose

const userSchema = new Schema({
    username: String,
    password: String,
    recipeBook: [{ genre: String, recipes: [ { title: String, ingredients: [String], steps: [String] }] }]
}, {collection: 'users'}) 

mongoose.model('User', userSchema)