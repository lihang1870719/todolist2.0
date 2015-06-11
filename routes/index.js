var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'todos',
    error: req.flash('error').toString(),
    success: req.flash('success').toString()
  });
  //res.redirect('todos')
});

module.exports = router;