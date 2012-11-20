var fs = require('fs');
var config = JSON.parse(fs.readFileSync("config.json"));

var Sequelize = require('sequelize');
var sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
  host: config.db.host,
  port: config.db.port
});

var User = sequelize.import(__dirname+"/models/User")
var Post = sequelize.import(__dirname+"/models/Post")
Post.belongsTo(User, {foreignKey: 'creator_id'});

module.exports.User = User;
module.exports.Post = Post;
