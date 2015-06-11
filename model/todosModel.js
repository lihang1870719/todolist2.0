var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var todosModel = new Schema({
  username: String,
  content: String,
  time: String
});

exports.todosModel = mongoose.model('todosModel', todosModel);