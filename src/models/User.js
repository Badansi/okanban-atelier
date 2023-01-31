const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class User extends Model { }

User.init({
    username: {
        type: DataTypes.STRING,
        unique: true,

    },
    password: {
      type: DataTypes.STRING
    }
}, {
    defaultScope: {
      attributes: {
        exclude: ['password']
      }
    },
    scopes: {
      withPassword: {
        attributes: {}
      }
    },
    sequelize,
    tableName: 'user'
});

module.exports = User;