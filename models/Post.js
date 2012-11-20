module.exports = function(sequelize, DataTypes) {
    return sequelize.define('post', {
    id: DataTypes.INTEGER,
    text: DataTypes.STRING,
    creator_id: DataTypes.INTEGER
  }, {
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    classMethods: {
      findAllPosts: function(callback){
        this.findAll().success(function(posts){
          callback(posts);
        }).error(function(error){
          callback(error)
        });
      },
      findPostById: function(id, callback){
        this.find({where: {id: id}}).success(function(post){
          callback(post);
        }).error(function(error){
          callback(error)
        });
      },
      createPost: function(params, callback){
        this.create({
          text: (params.text) ? params.text: '',
          creator_id: (params.creator_id) ? params.creator_id: null,
        }).success(function(post){
          callback(post);
        }).error(function(error){
          callback(error)
        });
      },
      updatePost: function(id, params, callback){
        this.find({where: {id: id}}).success(function(post){
          post.updateAttributes({
            text: (params.text) ? params.text: post.text,
            creator_id: (params.creator_id) ? params.creator_id: post.creator_id,
          }).success(function(post){
            callback(post);
          }).error(function(error){
            callback(error)
          });
        });
      },
      deletePost: function(id, callback){
        this.find({where: {id: id}}).success(function(post){
          post.destroy().success(function(){
            callback(post);
          }).error(function(error){
            callback(error)
          });
        });
      }
    }
  });
}
