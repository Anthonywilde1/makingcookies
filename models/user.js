const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
     email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
    
    // rememberMe: {
    //     required: false,
    //     type: Boolean
    // }
});
User.plugin(require('mongoose-bcrypt'));
module.exports = mongoose.model('user', User);