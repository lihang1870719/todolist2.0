var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var User = new Schema({
  username: String,
  password: String
});

exports.User = mongoose.model('User', User);