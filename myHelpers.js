var util = require('util');

exports.sendResponse = function sendResponse(result, req, res){
  if(util.isError(result)){
    res.send(400, result);
  } else {
    res.json(200, result);
  }
}
