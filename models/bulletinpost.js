const mongoose = require('mongoose');

const bulletinpostschema = mongoose.Schema(
    {
        department: {type: String, required:true},
        complaint: {type: String, required:true}
    }
)

module.exports = mongoose.model('bulletinpost',bulletinpostschema)