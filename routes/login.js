var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var models = require('../model/user.js');
var User = models.User;

router.get('/', function(req, res, next) {

  res.render('login', {
    title: 'login',
    error: req.flash('error').toString(),
    success: req.flash('success').toString()
  });
});

router.post('/', function(req, res, next) {
  console.log("in login");
  console.log(req.body);
  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('hex');
  console.log(password);
  User.find({username: req.body.username}, function(err, user) {
    if (user.length < 1) {
      req.flash('error', 'The username not exists');
      return res.redirect('/login');
    }
    if(user[0].password != password) {
      req.flash('error', 'The password is wrong');
      return res.redirect('/login');
    }
    req.session.user = user[0].username;
    req.flash('success', 'Login success');
    res.redirect('/todos');
  });
});

module.exports = router;