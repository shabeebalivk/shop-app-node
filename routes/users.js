const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

let User = require('../models/user');

//Load register form
router.get('/register',function (req,res) {
    res.render('register', {
        title: 'Register'
    });
});

//Post user
router.post('/register', function (req,res) {
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Passwrod is required').notEmpty();
    req.checkBody('password2', 'Please Confirm Password ').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    let errors = req.validationErrors();
    if (errors) {
        res.render('register', {
           errors: errors
        });
    } else {
        let newUser = new User({
            name:name,
            email:email,
            username: username,
            password:password
        });

        bcrypt.genSalt(10, function (err, salt) {
           bcrypt.hash(newUser.password, salt, function (err, hash) {
              if(err){
                  console.log(err);
              }
              newUser.password = hash;
              newUser.save(function (err) {
                 if(err){
                     console.log(err);
                 } else {
                     req.flash('success', 'Registrerd successfully');
                     res.redirect('/users/login');
                 }
              });
           });
        });
    }
});

router.get('/clientregister',function (req,res) {
    res.render('clientregister', {
        title: 'Register'
    });
});

//Post user
router.post('/clientregister', function (req,res) {
    const name = req.body.name;
    const id = req.body.id;
    const mobile_no = req.body.mobile_no;
    const password = req.body.password;
    const password2 = req.body.password2;

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('id', 'Id is required').notEmpty();
    req.checkBody('mobile_no', 'Mobile Number is required').notEmpty();
    req.checkBody('password', 'Passwrod is required').notEmpty();
    req.checkBody('password2', 'Please Confirm Password ').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    let errors = req.validationErrors();
    if (errors) {
        res.render('clientregister', {
           errors: errors
        });
    } else {
        let newUser = new User({
            name:name,
            email:id,
            username: mobile_no,
            password:password
        });

        bcrypt.genSalt(10, function (err, salt) {
           bcrypt.hash(newUser.password, salt, function (err, hash) {
              if(err){
                  console.log(err);
              }
              newUser.password = hash;
              newUser.save(function (err) {
                 if(err){
                     console.log(err);
                 } else {
                     req.flash('success', 'Registrerd successfully');
                     res.redirect('/users/login');
                 }
              });
           });
        });
    }
});


//load login form
router.get('/login', function (req,res) {
   res.render('login', {
       title: 'Login'
   });
});

//Login process
router.post('/login', function (req,res,next) {
   passport.authenticate('local', {
       successRedirect :  '/',
       failureRedirect : '/users/login',
       failureFlash : true,
   })(req, res, next);
});

//Log out
router.get('/logout', function (req,res) {
   req.logout();
   req.flash('success', 'you are Logged out');
   res.redirect('/users/login');
});

module.exports = router;
