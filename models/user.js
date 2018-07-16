const mongoose = require('mongoose')

const {Schema} = mongoose

// const userSchema = new Schema({
//     username: {type: String, required: true, unique: true},
//     password: {type: String, required: true, unique: true},
//     recipeBook: [{ genre: String, recipes: [ { title: String, ingredients: [String], steps: [String] }] }]
// }, {collection: 'users'}) 
const userSchema = new Schema({
    username: String,
    password: String,
    recipeBook: [{ genre: String, recipes: [ { title: String, ingredients: [String], steps: [String] }] }]
}, {collection: 'users'}) 
mongoose.model('User', userSchema)