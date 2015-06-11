var express = require('express');
var getDate = require('../util/getFormatDate.js');
/*var mongoose = require('mongoose');*/
var async = require('async');
var router = express.Router();

var models = require('../model/todosModel.js');
var Todos = models.todosModel;

/*mongoose.connect('mongodb://localhost/todos');*/

router.get('/', function(req, res, next) {
  var username = req.session.user;
  var content = req.query.content;
  console.log("content : " + content);
  console.log(username);
  if (!username) {
    req.flash('error', 'Please login');
    res.redirect('/login');
  }
  else if (content) {
    content = eval('/' + req.query.content + '/');
    Todos.find({content: content, username: username}, function (err, doc) {
      res.json({
        result: doc,
        success: 1
      });
    });
  }
  else
  {  
    Todos.find({username: username}, function (err, doc) {
      console.log(doc);
      res.render('todo', { 
        title: 'Todos', 
        todos: doc,
      });
    });
  }
});

router.post('/', function(req, res, next) {
  var username = req.session.user;
  var content = req.body.content;
  var time = getDate.getFormatDate(new Date());
/*  console.log(time);*/


  if (content) {
    
  }
  var newTodo = new Todos({
    username: username,
    content: content,
    time: time
  })
  async.series([
    function (callback) {
      newTodo.save(function (err){
        callback();
      });
    },
    function (callback) {
      Todos.find({username: username}, function (err, todos) {
          res.render('todo', { title: 'Todos', todos: todos });
      });
    }], function (err) {
      if (err) {
        console.error(err);
      } else {
        console.log(ok);
      }
  });

});

router.delete('/', function(req, res, next) {
  var id = req.query.id;
  console.log(req.query);
  if (id) {
    Todos.remove({_id: id}, function(err) {
      if (err) {
        console.log(err)
      } else {
        console.log("delete OK");
        res.json({success: 1});
      }
    });
  }
});

module.exports = router;