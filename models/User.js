module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    classMethods: {
      findAllUsers: function(callback){
        this.findAll().success(function(users){
          callback(users);
        }).error(function(error){
          callback(error)
        });
      },
      findUserById: function(id, callback){
        this.find({where: {id: id}}).success(function(user){
          callback(user);
        }).error(function(error){
          callback(error)
        });
      },
      createUser: function(params, callback){
        this.create({
          name: (params.name) ? params.name: '',
          email: (params.email) ? params.email: '',
        }).success(function(user){
          callback(user);
        }).error(function(error){
          callback(error)
        });
      },
      updateUser: function(id, params, callback){
        this.find({where: {id: id}}).success(function(user){
          user.updateAttributes({
            name: (params.name) ? params.name: user.name,
            email: (params.email) ? params.email: user.email,
          }).success(function(user){
            callback(user);
          }).error(function(error){
            callback(error)
          });
        });
      },
      deleteUser: function(id, callback){
        this.find({where: {id: id}}).success(function(user){
          user.destroy().success(function(){
            callback(user);
          }).error(function(error){
            callback(error)
          });
        });
      }
    }
  });
}
