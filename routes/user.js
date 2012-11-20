var db = require(__dirname + '/../db')
  , helpers = require(__dirname + ' /../myHelpers');


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

exports.login = function(req, res){
  if(req.body && req.body.name && req.body.password){
    var hash = helpers.hash(req);
    db.User.authentice(req.body.name, hash, function(amount){
      if(amount === 1){
        db.User.findUserByName(req.body.name, function(user){
          req.session.auth = true;
          req.session.user = user;
          var response = {"authenticated": true, "user": user};
          helpers.sendResponse(response, req, res);
        })
      } else {
        res.json(401, {"authenticated": false});
      }
    });
  } else {
    console.log(req.body);
    res.send(400, 'Invalid login')
  }
}

exports.logout = function(req, res){
  req.session.destroy();
  res.send(200, {"authenticated": false, "message": "logged out"})
}
