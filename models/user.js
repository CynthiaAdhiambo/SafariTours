const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const User = require('../models/user');
//user schema
const UserSchema = mongoose.Schema({
    name:{
        type: String
    },

    email:{
        type: String,
        required:true
    },

    phone: {
        type: String,
        required:true
    },

    username:{
        type: String,
        required: true
    },

    password: {
        type: String,
        required:true
    }
});

const Users = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
};

module.exports.getUserByUsername = function(username, callback){
    const query = {username: username}
    User.findOne({username: req.body.username}).exec().then(query, callback);
};

module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err, salt) => {
       bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) {
            return (err);
        }else{
            newUser.password = hash;
            newUser.save(callback); 
        }
                       
         });      
    }); 
};
 
module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
       if(err){
        return err;
       } else{
        callback(null, isMatch);
       }
        
    });
};