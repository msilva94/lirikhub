const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const User = require('../models/user');

// Register
/*router.post('/register', function(req, res, next) {
    let newUser = new User({
        username: req.body.username,
        password: req.body.password
    });
    
    User.addUser(newUser, function(err, user) {
        if(err){
            res.json({success: false, msg:'Failed to register user'})
        } else {
            res.json({success: true, msg:'User registered'})
        }
    });
})*/

// Authenticate
router.post('/authenticate', function(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, function(err, user) {
        if(err){
            return res.json({success: false, msg:'An error ocurred'});
        }

        if(!user){
            return res.json({success: false, msg:'User not found'});
        }

        User.comparePassword(password, user.password, function(err, isMatch) {
            if(err){
                return res.json({success: false, msg:'An error ocurred'});
            }

            if(isMatch){
                const user_info = {_id: user._id, username: user.username};
                const token = jwt.sign({data: user_info}, config.secret, {
                    expiresIn: "1d"
                });

                res.json({
                    success: true,
                    token: 'JWT ' + token
                });
            } else {
                res.json({success: false, msg:'Wrong password'});
            }
        })
    });
})

module.exports = router;