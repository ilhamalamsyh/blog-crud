'use strict';

const { sequelize } = require(".");

// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Comment extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   };
//   Comment.init({
//     content: DataTypes.TEXT,
//     userId: DataTypes.INTEGER,
//     postId: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'Comment',
//   });
//   return Comment;
// };

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      content: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
    },
    {},
  );
  Comment.associate = function (models) {
    Comment.belongsTo(models.User, {foreignKey:'userId', as: 'author'});
    Comment.belongsTo(models.Post, {foreignKey:'postId', as:'post'});
  };
  return Comment;
}
