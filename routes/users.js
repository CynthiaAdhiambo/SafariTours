const express = require('express');
const router = express.Router();
 const User =require('../models/user');
 const config = require('../config/database');
const passport = require('passport');
const jwt = require ('jsonwebtoken');

//register
router.post('/register', (req, res, next) => {
    let newUser = new User({
       name: req.body.name,
       email: req.body.email,
       phone:req.body.phone,
       username: req.body.username,
       password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if (err){
            res.json({success: false, msg: 'Failed to Register User'});
        }else{
            res.json({success: true, msg: 'User Registed'});
        }
    })
});

//authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err) {
            return err;
        }
        if (!user){
            return res.json({success: false, msg:'User not Found'});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err){
                 return err;
            }
            if (isMatch){
               const token = jwt.sign(user, config.secret, {
                   expiresIn: 604800 //1 week
               });

               res.json({
                   success: true,
                   token: 'JWT '+token,
                   user: {
                       id: user._id,
                       name: user.name,
                       username: user.username,
                       phone: user.phone,
                       email:user.email
                   }
               });
            } else{
                return res.json({success: false, msg: 'Wrong Password'});
            }
        });        
    });
});

//profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({user: req.user});
});


module.exports = router; 