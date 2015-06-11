var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var mongoose = require('mongoose');
var models = require('../model/user.js');
var User = models.User;

mongoose.connect('mongodb://localhost/todos');


router.get('/', function(req, res, next) {
  res.render('reg', { 
    title: 'reg',
    error: req.flash('error').toString(),
    success: req.flash('success').toString()
  });
});

router.post('/', function(req, res, next) {
/*  console.log(req.body);*/
  var username = req.body.username;
  var password = req.body.password;
  var cfPassword = req.body.cfPassword;
  if (password != cfPassword) {
    req.flash('error', 'The password is inconsistent');
    return res.redirect('/reg');
  }
  var md5 = crypto.createHash('md5');
  password = md5.update(req.body.password).digest('hex');
  var newUser = new User({
    username: username,
    password: password
  });
/*  console.log("password: " + password);*/
  User.find({username: newUser.username}, function (err, result) {
/*    console.log(result);*/
    if (result.length > 0) {
      req.flash('error', 'The username already exists');
      return res.redirect('/reg');
    }
/*    console.log('保存数据');*/
    newUser.save(function (err) {
      if (err) {
        req.flash('error', err);
        return res.redirect('/reg');
      }
      req.session.user = newUser.username;
      req.flash('success', 'success reg');
      res.redirect('/todos');
    });
  });
});

module.exports = router;