const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');
const List = require('./List');

class Card extends Model { }

Card.init({
    title: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    position: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    list_id: {
      type: DataTypes.INTEGER,
      references: {
        model: List,
        key: 'id',
      }
    }
}, {
    sequelize,
    tableName: 'card'
});

module.exports = Card;