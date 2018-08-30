const mongoose = require('mongoose')

const {Schema} = mongoose

// const userSchema = new Schema({
//     username: {type: String, required: true, unique: true},
//     password: {type: String, required: true, unique: true},
//     recipeBook: [{ genre: String, recipes: [ { title: String, ingredients: [String], steps: [String] }] }]s
// }, {collection: 'users'})  new schema takes two arguments, both of which are object literals
// , img:{data: Buffer, contentType: String }

const userSchema = new Schema({
    username: String,
    password: String,
    recipeBook: [{ genre: String, recipes: [ { title: String, ingredients: [String], steps: [String] }] }]
}, {collection: 'users'}) 
mongoose.model('User', userSchema)