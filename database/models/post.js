'use strict';

const { sequelize } = require(".");

// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Post extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   };
//   Post.init({
//     title: DataTypes.STRING,
//     content: DataTypes.TEXT,
//     userId: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'Post',
//   });
//   return Post;
// };

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      userId: DataTypes.INTEGER,
    },
    {},
  );
  Post.associate = function (models) {
    Post.belongsTo(models.User, {foreignKey:'userId', as:'author'}),
    Post.hasMany(models.Comment, {foreignKey:'postId', as:'comments'})
  };
  return Post;
}