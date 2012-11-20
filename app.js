
// Module dependencies
var express = require('express')
  , http = require('http')
  , path = require('path')
  , fs = require('fs')
  , helpers = require('./myHelpers')
  , routes = require('./routes')
  , user = require('./routes/user')
  , post = require('./routes/post');

// configure express
var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('this is a secret'));
  app.use(express.session({
    secret  : "Stays my secret",
    cookie: {expires: new Date(Date.now() + 3600000)}
  }));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

//routes
app.get('/', helpers.checkAuth, routes.index);
app.post('/login', user.login);
app.post('/logout', user.logout);
//user routes
app.get('/users', helpers.checkAuth, user.getAll);
app.get('/users/:id', helpers.checkAuth, user.getById);
app.post('/users', helpers.checkAuth, user.create);
app.put('/users/:id', helpers.checkAuth, user.update);
app.put('/users/password/:id', helpers.checkAuth, user.changePassword);
app.del('/users/:id', helpers.checkAuth, user.del);
//post routes
app.get('/posts', helpers.checkAuth, post.getAll);
app.get('/posts/:id', helpers.checkAuth, post.getById);
app.post('/posts', helpers.checkAuth, post.create);
app.put('/posts/:id', helpers.checkAuth, post.update);
app.del('/posts/:id', helpers.checkAuth, post.del);
//not found
app.get('/*', function(req, res){
  res.send(404, 'page not found')
});


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
