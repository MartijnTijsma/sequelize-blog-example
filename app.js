
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , fs = require('fs')
  , routes = require('./routes')
  , user = require('./routes/user')
  , post = require('./routes/post')
  ;

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

//routes
app.get('/', routes.index);
//user routes
app.get('/users', user.getAll);
app.get('/users/:id', user.getById);
app.post('/users', user.create);
app.put('/users/:id', user.update);
app.del('/users/:id', user.del);
//post routes
app.get('/posts', post.getAll);
app.get('/posts/:id', post.getById);
app.post('/posts', post.create);
app.put('/posts/:id', post.update);
app.del('/posts/:id', post.del);
//not found
app.get('/*', function(req, res){
  res.send(404, 'page not found')
});

function sendInvalidRequest(req, res){
  res.send(400, "Invalid request")
}


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
