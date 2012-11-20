var db = require(__dirname + '/../db');
var helpers = require(__dirname + ' /../myHelpers');

exports.getAll = function(req, res){
  db.Post.findAllPosts(function(posts){
    helpers.sendResponse(posts, req, res);
  });
};

exports.getById = function(req, res){
  db.Post.findPostById(req.params.id, function(post){
    var user = post.getUser().success(function(user){
      console.log(user);
      var result ={};
      result.post = post;
      result.post.user = user;
      helpers.sendResponse(result, req, res);
    })
  });
};

exports.create = function(req, res){
  db.Post.createPost(req.body, function(post){
    helpers.sendResponse(post, req, res);
  });
}

exports.update = function(req, res){
  db.Post.updatePost(req.params.id, req.body, function(post){
    helpers.sendResponse(post, req, res);
  });
}

exports.del = function(req, res){
  db.Post.deletePost(req.params.id, function(post){
    helpers.sendResponse(post, req, res);
  });
}
