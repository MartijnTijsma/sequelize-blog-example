var db = require(__dirname + '/../db');
var helpers = require(__dirname + ' /../myHelpers');

exports.getAll = function(req, res){
  db.User.findAllUsers(function(users){
    helpers.sendResponse(users, req, res);
  });
};

exports.getById = function(req, res){
  db.User.findUserById(req.params.id, function(user){
    helpers.sendResponse(user, req, res);
  });
};

exports.create = function(req, res){
  db.User.createUser(req.body, function(user){
    helpers.sendResponse(user, req, res);
  });
}

exports.update = function(req, res){
  db.User.updateUser(req.params.id, req.body, function(user){
    helpers.sendResponse(user, req, res);
  });
}

exports.del = function(req, res){
  db.User.deleteUser(req.params.id, function(user){
    helpers.sendResponse(user, req, res);
  });
}
