var util = require('util')
  , crypto = require('crypto');

exports.sendResponse = function(result, req, res){
  if(util.isError(result)){
    res.send(400, result);
  } else {
    res.json(200, result);
  }
}

exports.hash = function(req){
  console.log('start hashing')
  var hash = crypto
    .createHmac("sha1", "SuperSecretKey")
    .update(req.body.password)
    .digest('hex');
  return hash;
}

exports.checkAuth = function(req ,res, next){
  console.log(req.session.auth);
  if(req.session.auth === true){
    next();
  } else {
    res.send(401,{"authenticated": false})
  }
}
