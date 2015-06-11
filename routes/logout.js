var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  req.session.user = null;
  req.flash('success', 'success logout');
  res.redirect('/');
});

module.exports = router;