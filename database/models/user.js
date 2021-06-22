'use strict';

const bcrypt = require('bcryptjs');
const { sequelize } = require('.');

// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   };
//   User.init({
//     name: DataTypes.STRING,
//     email: DataTypes.STRING,
//     password: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'User',
//   });
//   return User;
// };

module.exports = (sequelize, DataTypes) =>{
  const User = sequelize.define(
    'User',
    {
      name:DataTypes.STRING,
      email:DataTypes.STRING,
      password:DataTypes.STRING
    },
    {
      // Added the defaultScope options to ensure that the password is not returned as part of the JSON result when the User model is queried.
      defaultScope:{
        rawAttributes:{exclude: ['password']},
      },
    },
  );

  // Added beforeCreate hook which automatically hashes the password using bcrypt.js under the hood
  User.beforeCreate(async (user) => {
      user = await user.generatedPasswordHash();
  });
  User.prototype.generatedPasswordHash=function () {
    if (this.password) {
      return bcrypt.hash(this.password, 10);
    }
  }
  // define relationship a user has many posts
  User.associate = function (models) {
    // associate can be defined in here
    User.hasMany(models.Post, {foreignkey:'userId', as:'posts'});
  };
  return User;
}