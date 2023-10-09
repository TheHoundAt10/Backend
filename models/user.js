const mongoose = require('mongoose')

const userschema = mongoose.Schema({
    firstname: {type: String, required:true},
    surname: {type: String, required:true},
    username: {type: String, required:true},
    email: {type: String, required:true},
    password: {type: String, required:true},
    cityofresidence: {type: String, required:true}
})

module.exports = mongoose.model('User',userschema)