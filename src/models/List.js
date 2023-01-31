const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

class List extends Model { }

List.init({
    name: {
        type: DataTypes.STRING,
        unique: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      }
    }
}, {
    sequelize,
    tableName: 'list'
});

module.exports = List;