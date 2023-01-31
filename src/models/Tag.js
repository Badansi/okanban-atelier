const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Tag extends Model { }

Tag.init({
    name: {
        type: DataTypes.STRING,
        unique: true,
    },
}, {
    sequelize,
    tableName: 'tag'
});

module.exports = Tag;