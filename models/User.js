module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
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
        this.find({where: {id: id}, attributes: ['id', 'name', 'email']}).success(function(user){
          callback(user);
        }).error(function(error){
          callback(error)
        });
      },
      findUserByName: function(name, callback){
        this.find({where: {name: name}, attributes: ['id', 'name', 'email']}).success(function(user){
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
        this.find({where: {id: id}, attributes: ['id', 'name', 'email']}).success(function(user){
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
      },
      authentice: function(name, hash, callback){
        this.count({where:{name: name, password:hash}}).success(function(amount){
          console.log('amount: '+amount);
          callback(amount);
        }).error(function(error){
          console.log('Error: '+error);
          callback(error);
        });
      }
    }
  });
}
